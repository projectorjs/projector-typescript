// @flow
"use strict";

const fs = require("fs");
const chalk = require("chalk");
const ts = require("typescript");
const merge = require("lodash.merge");
const matchFiles = ts.matchFiles;

function createProgramConfig(
  opts /*: CompileOptions */
) /*: Promise<{ files: Array<string>, compilerOptions: CompilerOptions }> */ {
  const projectDir = (opts.compilerOptions && opts.compilerOptions.project) || opts.cwd || process.cwd();
  return new Promise((resolve, reject) => {
    const configPath = ts.findConfigFile(projectDir, ts.sys.fileExists);
    const tsconfig = configPath ? ts.readConfigFile(configPath, ts.sys.readFile) : { config: {} };

    if (tsconfig.error) return reject(tsconfig.error);

    const mergedConfig = merge(tsconfig.config, opts);
    const jsonConfig = ts.parseJsonConfigFileContent(mergedConfig, createParseConfigHost(projectDir), projectDir);

    resolve({
      files: jsonConfig.fileNames,
      compilerOptions: jsonConfig.options
    });
  });
}

function getAccessibleFileSystemEntries(path /*: string*/) /* { files: Array<string>, directories: Array<string> } */ {
  try {
    const entries = fs.readdirSync(path || ".").sort();
    const files = [];
    const directories = [];
    return entries.reduce(
      (acc, entry) => {
        // This is necessary because on some file system node fails to exclude
        // "." and "..". See https://github.com/nodejs/node/issues/4002
        if (entry === "." || entry === "..") {
          return acc;
        }
        const name = ts.combinePaths(path, entry);

        let stat;
        try {
          stat = fs.statSync(name);
        } catch (e) {
          return acc;
        }

        if (stat.isFile()) {
          acc.files.push(entry);
        } else if (stat.isDirectory()) {
          acc.directories.push(entry);
        }

        return acc;
      },
      { files: [], directories: [] }
    );
  } catch (e) {
    return { files: [], directories: [] };
  }
}

function createParseConfigHost(projectPath /*: string */) {
  function readDirectory(
    rootDir /*: string */,
    extensions /*: Array<string> */,
    excludes /*: Array<string> */,
    includes /*: Array<string> */,
    depth /*: number */
  ) {
    return matchFiles(
      rootDir,
      extensions,
      excludes,
      includes,
      ts.sys.useCaseSensitiveFileNames,
      projectPath,
      depth,
      getAccessibleFileSystemEntries
    );
  }

  function fileExists(path /*: string */) {
    return ts.sys.fileExists(path);
  }

  function readFile(path /*: string */) {
    return ts.sys.readFile(path);
  }

  return {
    fileExists,
    readDirectory,
    readFile,
    useCaseSensitiveFileNames: ts.sys.useCaseSensitiveFileNames
  };
}

function splitDiagnosticsByType(diagnostics /*: Diagnostic[] */) /*: DiagnosticByGroup */ {
  return diagnostics.reduce(
    (acc, diagnostic) => {
      const category = ts.DiagnosticCategory[diagnostic.category].toLowerCase();
      acc[category].push(diagnostic);
      return acc;
    },
    { warning: [], error: [], message: [] }
  );
}

function groupDeagnosticsByFile(diagnostics /*: Diagnostic[] */) /* {: [name: string]: Diagnostic[] } */ {
  return diagnostics.reduce((acc, diagnostic) => {
    const group = diagnostic.file ? diagnostic.file.fileName : "Compiler";
    acc[group] = acc[group] || [];
    acc[group].push(diagnostic);
    return acc;
  }, {});
}

function formatDiagnosticMessage(diagnostic /*: Diagnostic */) {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
  if (diagnostic.file) {
    const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    return `${chalk.dim("[" + position.line + 1 + "," + (position.character + 1) + "]")} ${message} ${chalk.magenta(
      "[TS" + diagnostic.code + "]"
    )}`;
  } else {
    return `${message} ${chalk.magenta("[TS" + diagnostic.code + "]")}`;
  }
}

function padString(str /*: string */, count /*: number */) /*: string */ {
  const pad = new Array(count).fill(" ").join("");
  return pad + str;
}

function printDiagnosticsGroup(
  title /*: string*/,
  color /*: (text: string) => string */,
  diagnostics /*: ?Diagnostic[] */
) {
  if (!diagnostics || !diagnostics.length) return;
  const prefix = chalk.dim("[TS]  ");
  console.log(prefix + color(`${title}:`));
  const diagnosticsByFile = groupDeagnosticsByFile(diagnostics);
  Object.keys(diagnosticsByFile).forEach(fileName => {
    console.log(`${prefix}${padString(fileName, 2)}:`);
    diagnosticsByFile[fileName].forEach(diagnostic => {
      console.log(`${prefix}${padString(formatDiagnosticMessage(diagnostic), 4)}`);
    });
  });
}

function printDiagnostics(diagnostics /*: DiagnosticByGroup */) {
  printDiagnosticsGroup("Errors", chalk.red, diagnostics.error);
  printDiagnosticsGroup("Warnings", chalk.yellow, diagnostics.warning);
  printDiagnosticsGroup("Messages", chalk.blue, diagnostics.message);
}

module.exports = {
  createProgramConfig: createProgramConfig,
  getAccessibleFileSystemEntries: getAccessibleFileSystemEntries,
  createParseConfigHost: createParseConfigHost,
  printDiagnostics: printDiagnostics,
  splitDiagnosticsByType: splitDiagnosticsByType,
  formatDiagnosticMessage: formatDiagnosticMessage,
  groupByFile: groupDeagnosticsByFile
};
