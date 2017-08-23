const path = require("path");
const createProgramConfig = require("../utils").createProgramConfig;

describe("#createProgramConfig", () => {
  test("should load tsconfig and merge with provided compilerOptions and files", () => {
    return createProgramConfig({
      files: ["src/another.ts"],
      compilerOptions: {
        project: path.join(__dirname, "__mocks__", "load-config", "with-tsconfig"),
        sourceMap: true,
        declaration: true
      }
    }).then(config => expect(config).toMatchSnapshot());
  });

  test("should support tsconfig with extends", () => {
    return createProgramConfig({
      files: ["src/another.ts"],
      compilerOptions: {
        project: path.join(__dirname, "__mocks__", "load-config", "with-tsconfig-and-extends"),
        sourceMap: true
      }
    }).then(config => expect(config).toMatchSnapshot());
  });

  test("should not blow up if tsconfig doesn't exist", () => {
    const projectPath = path.join(__dirname, "__mocks__", "load-config", "without-tsconfig");
    return createProgramConfig({
      cwd: projectPath,
      files: [path.join(projectPath, "src/another.ts")],
      compilerOptions: {
        sourceMap: true,
        declaration: true
      }
    })
      .then(config => expect(config).toMatchSnapshot())
      .catch(error => {
        console.log(JSON.stringify(error, null, 2));
        throw error;
      });
  });

  test("should override compilerOptions from tsconfig with ones that were passed", () => {
    return createProgramConfig({
      cwd: path.join(__dirname, "__mocks__", "load-config", "with-tsconfig"),
      compilerOptions: {
        target: "es5"
      }
    }).then(config => expect(config).toMatchSnapshot());
  });
});

describe("#getAccessibleFileSystemEntries", () => {
  test();
});

describe("#splitDiagnosticsByType", () => {
  test();
});

describe("#groupDiagnosticsByFile", () => {
  test();
});

describe("#formatDiagnosticMessage", () => {
  test();
});
