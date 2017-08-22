"use strict";
var Foo = (function () {
    function Foo() {
    }
    Foo.prototype.method = function () {
        return "bar";
    };
    Foo.prototype.secondMethod = function () {
        return "foo" + "bar";
    };
    return Foo;
}());
