// @flow

const ts = require("../index");

describe("#transpile", () => {
  const code = `import {f} from "foo";
export const x = f();`;

  test("should compile simple case", () => {
    return ts.transpile({ code }).then(result => expect(result).toMatchSnapshot());
  });

  test("should respect compilerOptions", () => {
    return ts
      .transpile({ code, compilerOptions: { target: "ES2015" } })
      .then(result => expect(result).toMatchSnapshot());
  });

  test("should compile using all transpile options", () => {
    return ts
      .transpile({ code, fileName: "test.ts", moduleName: "projector-typescript" })
      .then(result => expect(result).toMatchSnapshot());
  });
});
