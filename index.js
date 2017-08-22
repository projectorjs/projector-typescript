// @flow

/**
  Docs:
    https://www.typescriptlang.org/docs/handbook/compiler-options.html
*/

/* ::
  export type CompilerOptions = {
    // Allow JavaScript files to be compiled.
    allowJs?: boolean, // default: false

    // Allow default imports from modules with no default export. This does not affect code emit, just typechecking.
    allowSyntheticDefaultImports?: boolean, // default: module === "system"

    // Do not report errors on unreachable code.
    allowUnreachableCode?: boolean, // default: false

    // Do not report errors on unused labels.
    allowUnusedLabels?: boolean, // default: false

    // Parse in strict mode and emit "use strict" for each source file
    alwaysStrict?: boolean, // default: false

    // Base directory to resolve non-relative module names. See Module Resolution documentation for more details.
    baseUrl?: string,

    // The character set of the input files.
    charset?: string, // default: "utf8"

    // Report errors in .js files. Use in conjunction with --allowJs.
    checkJs?: boolean, // default: false

    // Generates corresponding .d.ts file.
    declaration?: boolean, // default: false

    // Output directory for generated declaration files.
    declarationDir?: string,

    // Show diagnostic information.
    diagnostics?: boolean, // default: false

    // Disable size limitation on JavaScript project.
    disableSizeLimit?: boolean, // default: false

    // Provide full support for iterables in for..of, spread and destructuring when targeting ES5 or ES3.
    downlevelIteration?: boolean, // default: false

    // Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files.
    emitBOM?: boolean, // default: false

    // Emit design-type metadata for decorated declarations in source. See issue #2577 for details.
    emitDecoratorMetadata?: boolean, // default: false

    // Enables experimental support for ES decorators.
    experimentalDecorators?: boolean, // default: false

    // Disallow inconsistently-cased references to the same file.
    forceConsistentCasingInFileNames?: boolean, // default: false

    // Print help message.
    help?: boolean,

    // Import emit helpers (e.g. __extends, __rest, etc..) from tslib
    importHelpers?: boolean, // default: false

    // Emit a single file with source maps instead of having a separate file.
    inlineSourceMap?: boolean, // default: false

    // Emit the source alongside the sourcemaps within a single file; requires --inlineSourceMap or --sourceMap to be set.
    inlineSources?: boolean, // default: false

    // Initializes a TypeScript project and creates a tsconfig.json file.
    init?: boolean,

    // Transpile each file as a separate module (similar to `ts.transpileModule`).
    isolatedModules?: boolean, // default: false

    // Support JSX in .tsx files: "React" or "Preserve". See JSX.
    jsx?: string, // default: "Preserve"

    // Specify the JSX factory function to use when targeting react JSX emit, e.g. React.createElement or h.
    jsxFactory?: string, // default: "React.createElement"

    // List of library files to be included in the compilation.
    // Possible values are:
    // - ES5
    // - ES6
    // - ES2015
    // - ES7
    // - ES2016
    // - ES2017
    // - ESNext
    // - DOM
    // - DOM.Iterable
    // - WebWorker
    // - ScriptHost
    // - ES2015.Core
    // - ES2015.Collection
    // - ES2015.Generator
    // - ES2015.Iterable
    // - ES2015.Promise
    // - ES2015.Proxy
    // - ES2015.Reflect
    // - ES2015.Symbol
    // - ES2015.Symbol.WellKnown
    // - ES2016.Array.Include
    // - ES2017.object
    // - ES2017.SharedMemory
    // - esnext.asynciterable
    //
    // Note: If --lib is not specified a default library is injected. The default library injected is:
    // - For --target ES5: DOM,ES5,ScriptHost
    // - For --target ES6: DOM,ES6,DOM.Iterable,ScriptHost
    lib?: string[],

    // Print names of generated files part of the compilation.
    listEmittedFiles?: boolean, // default: false

    // Print names of files part of the compilation.
    listFiles?: boolean, // default: false

    // The locale to use to show error messages, e.g. en-us.
    locale?: string, // default: (platform specific)

    // Specifies the location where debugger should locate map files instead of generated locations.
    // Use this flag if the .map files will be located at run-time in a different location than the .js files.
    // The location specified will be embedded in the sourceMap to direct the debugger where the map files will be located.
    mapRoot?: string,

    // The maximum dependency depth to search under node_modules and load JavaScript files. Only applicable with --allowJs.
    maxNodeModuleJsDepth?: number, // default: 0

    // Specify module code generation: "None", "CommonJS", "AMD", "System", "UMD", "ES6", "ES2015" or "ESNext".
    // - Only "AMD" and "System" can be used in conjunction with --outFile.
    // - "ES6" and "ES2015" values may be used when targeting "ES5" or lower.
    module?: string, // default: target === "ES6" ? "ES6" : "CommonJS"

    // Determine how modules get resolved. Either "Node" for Node.js/io.js style resolution, or "Classic".
    // See Module Resolution documentation for more details.
    moduleResolution?: string, // default: module === "AMD" | "System" | "ES6" ? "Classic" : "Node"

    // Use the specified end of line sequence to be used when emitting files: "crlf" (windows) or "lf" (unix).
    newLine?: string, // default: (platform specific)

    // Do not emit outputs.
    noEmit?: boolean, // default: false

    // Do not generate custom helper functions like __extends in compiled output.
    noEmitHelpers?: boolean, // default: false

    // Do not emit outputs if any errors were reported.
    noEmitOnError?: boolean, // default: false

    // Report errors for fallthrough cases in switch statement.
    noFallthroughCasesInSwitch?: boolean, // default: false

    // Raise error on expressions and declarations with an implied any type.
    noImplicitAny?: boolean, // default: false

    // Report error when not all code paths in function return a value.
    noImplicitReturns?: boolean, // default: false

    // Raise error on this expressions with an implied any type.
    noImplicitThis?: boolean, // default: false

    // Do not emit "use strict" directives in module output.
    noImplicitUseStrict?: boolean, // default: false

    // Do not include the default library file (lib.d.ts).
    noLib?: boolean, // default: false

    // Do not add triple-slash references or module import targets to the list of compiled files.
    noResolve?: boolean, // default: false

    // Disable strict checking of generic signatures in function types.
    noStrictGenericChecks?: boolean, // default: false

    // Report errors on unused locals.
    noUnusedLocals?: boolean, // default: false

    // Report errors on unused parameters.
    noUnusedParameters?: boolean, // default: false

    // DEPRECATED. Use --outFile instead.
    out?: string,

    // Redirect output structure to the directory.
    outDir?: string,

    // Concatenate and emit output to single file. The order of concatenation is determined
    // by the list of files passed to the compiler on the command line along with triple-slash references and imports.
    // See output file order documentation for more details.
    outFile?: string,

    // List of path mapping entries for module names to locations relative to the baseUrl.
    // See Module Resolution documentation for more details.
    paths?: Object,

    // Do not erase const enum declarations in generated code. See const enums documentation for more details.
    preserveConstEnums?: boolean, // default: false

    // Stylize errors and messages using color and context.
    pretty?: boolean, // default: false

    // Compile a project given a valid configuration file.
    // The argument can be a file path to a valid JSON configuration file, or a directory path to a directory containing a tsconfig.json file.
    // See tsconfig.json documentation for more details.
    project?: string,

    // DEPRECATED. Use --jsxFactory instead.
    // Specifies the object invoked for createElement and __spread when targeting "react" JSX emit.
    reactNamespace?: string, // default: "React"

    // Remove all comments except copy-right header comments beginning with /*!
    removeComments?: boolean, // default: false

    // Specifies the root directory of input files. Only use to control the output directory structure with --outDir.
    rootDir?: string, // default: (common root directory is computed from the list of input files)

    // List of root folders whose combined content represent the structure of the project at runtime.
    // See Module Resolution documentation for more details.
    rootDirs?: string[],

    // DEPRECATED. Use --skipLibCheck instead.
    // Skip type checking of default library declaration files.
    skipDefaultLibCheck?: boolean, // default: false

    // Skip type checking of all declaration files (*.d.ts).
    skipLibCheck?: boolean, // default: false

    // Generates corresponding .map file.
    sourceMap?: boolean, // default: false

    // Specifies the location where debugger should locate TypeScript files instead of source locations.
    // Use this flag if the sources will be located at run-time in a different location than that at design-time.
    // The location specified will be embedded in the sourceMap to direct the debugger where the source files will be located.
    sourceRoot?: string,

    // Enable all strict type checking options.
    // Enabling --strict enables --noImplicitAny, --noImplicitThis, --alwaysStrict and --strictNullChecks.
    strict?: boolean, // default: false

    // In strict null checking mode, the null and undefined values are not in the domain of every type
    // and are only assignable to themselves and any (the one exception being that undefined is also assignable to void).
    strictNullChecks?: boolean, // default: false

    // Do not emit declarations for code that has an  JSDoc annotation.
    stripInternal?: boolean, // default: false

    // Suppress excess property checks for object literals.
    suppressExcessPropertyErrors?: boolean, // default: false

    // Suppress --noImplicitAny errors for indexing objects lacking index signatures. See issue #1232 for more details.
    suppressImplicitAnyIndexErrors?: boolean, // default: false

    // Specify ECMAScript target version: "ES3" (default), "ES5", "ES6"/"ES2015", "ES2016", "ES2017" or "ESNext".
    //
    // Note: "ESNext" targets latest supported ES proposed features.
    target?: string, // default: "ES3"

    // Report module resolution log messages.
    traceResolution?: boolean, // default: false

    // List of names of type definitions to include. See @types, �typeRoots and �types for more details.
    types?: string[],

    // List of folders to include type definitions from. See @types, �typeRoots and �types for more details.
    typeRoots?: string[],

    // Print the compiler�s version.
    version?: boolean,

    // Run the compiler in watch mode. Watch input files and trigger recompilation on changes.
    watch?: boolean,
  };

  export type Diagnostic = {
    // Starting file location at which text applies.
    start: Location;

    // The last file location at which the text applies.
    end: Location;

    // Text of diagnostic message.
    text: string;

    // The category of the diagnostic message, e.g. "error" vs. "warning"
    category: string;

    // The error code of the diagnostic message.
    code?: number;

    // The name of the plugin reporting the message.
    source?: string;
  }

  export type TranspileOptions = {
    code: string,
    compilerOptions?: CompilerOptions,
    fileName?: string,
    reportDiagnostics?: boolean,
    moduleName?: string,
    renamedDependencies?: Map<string>;
  };

  export type TranspileOutput = {
    outputText: string;
    diagnostics?: Diagnostic[];
    sourceMapText?: string;
  };

  export type CompileOptions = {
    file?: string,
    compilerOptions?: CompilerOptions,
    cwd?: string
  };
*/

const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const spawn = require("projector-spawn");
const dargs = require("dargs");

function isFileExist(filePath /*: string*/) /*: Promise<mixed> */ {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, err => {
      if (err) return reject();
      resolve();
    });
  });
}

function getTypeScriptCompilerPath() /*: Promise<string> */ {
  const tscBin = "tsc";
  return spawn("npm", ["bin"])
    .then(spawnOutput => {
      const binPath = spawnOutput.stdout.trim();
      const tscBinPath = path.join(binPath, tscBin);
      return isFileExist(tscBin).then(() => tscBinPath).catch(() => tscBin);
    })
    .catch(e => {
      return tscBin;
    });
}

exports.transpile = function transpile(opts /*: TranspileOptions */ = { code: "" }) /*: Promise<TranspileOutput> */ {
  return Promise.resolve(ts.transpileModule(opts.code, opts));
};

exports.compile = function compile(opts /*: CompileOptions */ = {}) {
  let args = [];
  let cwd = opts.cwd || process.cwd();

  if (opts.file) {
    args = [opts.file].concat(args);
  }

  if (opts.compilerOptions) {
    args = args.concat(dargs(opts.compilerOptions, { useEquals: false }));
  }

  return getTypeScriptCompilerPath().then(tsc => spawn(tsc, args, { cwd: cwd }));
};
