import { evaluate } from "./lisp";

describe("expression test", () => {
    test("+", () => {
        const exp1 = ["+"];
        const actual = evaluate(exp1);
        expect(actual).toEqual(0);
    });
    test("+ two args", () => {
        const exp1 = ["+", 1, 2];
        const actual = evaluate(exp1);
        expect(actual).toEqual(3);
    });
    test("+ more than 2 args", () => {
        const exp1 = ["+", 1, 2, 3];
        const actual = evaluate(exp1);
        expect(actual).toEqual(6);
    });
    test("+ nested", () => {
        const exp1 = ["+", 1, ["+", 2, 3, 4], 5];
        const actual = evaluate(exp1);
        expect(actual).toEqual(15);
    });
});
