// @flow

/**
 *  Docs:
 *  https://www.typescriptlang.org/docs/handbook/compiler-options.html
 */

/*::
 import type { TranspileOptions, TranspileOutput, CompileOptions } from './types';
 */

"use strict";

const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const createProgramConfig = require("./utils").createProgramConfig;
const printDiagnostics = require("./utils").printDiagnostics;
const splitDiagnosticsByType = require("./utils").splitDiagnosticsByType;

exports.transpile = function transpile(opts /*: TranspileOptions */) /*: Promise<TranspileOutput> */ {
  const code = opts.code || "";
  return Promise.resolve(ts.transpileModule(code, opts));
};

exports.compile = function compile(opts /*: CompileOptions */) {
  return createProgramConfig(opts)
    .then(tsConfig => ts.createProgram(tsConfig.files, tsConfig.compilerOptions))
    .catch(error => {
      if (!(error instanceof Error)) {
        printDiagnostics({ error: error });
      }

      return Promise.reject(error);
    })
    .then(program => {
      const emitResult = program.emit();
      const diagnostics = splitDiagnosticsByType(ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics));

      printDiagnostics(diagnostics);

      // Fail if we have any errors in diagnostics report.
      if (diagnostics.error && diagnostics.error.length) {
        return Promise.reject(diagnostics);
      }
    });
};
