import someFunc from "./utils";
class Foo {
    constructor() {
        this.prop = { a: 1 };
    }
    method() {
        return "bar";
    }
    sum() {
        const a = 1 + "2";
    }
    secondMethod() {
        someFunc();
        this.test();
        return "foo" + "bar";
    }
}
//# sourceMappingURL=index.js.map