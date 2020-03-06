import { evaluate } from "./interpreter";
import * as acorn from "acorn";

describe("without function declaration", () => {
  test('integer literal', () => {
    const source = `
7
6
5
  `;
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe(5);
  });

  test('binary expression', () => {
    const source = `
7
6
5 + 4
  `;
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe(9);
  });

  test('binary expression 2', () => {
    const source = `
4 * (2+3)
5 + 4 * 4
  `;
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe(21);
  });

  test('variable declaration', () => {
    const source = `
  var a = 1
  a + 9
  `
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe(10);
  })

  test('variable declaration 2', () => {
    const source = `
  var a = 1
  var b = 9
  a + b
  `
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe(10);
  })

  test('variable not defined', () => {
    const source = `
  b + 9
  `
    const ast = acorn.parse(source);
    // seems have to wrap the call to assert error message
    // expect(() => evaluate(ast)).toThrow('b not defined');
    try {
      evaluate(ast);
    } catch (e) {
      expect(e.message).toBe('b not defined')
    }
  })

  test('function call', () => {
    const source = `
    print(1,3+4)
  `
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe("haha 1, 7")
  })

  test('function call with variables', () => {
    const source = `
  var a = 2
  var b = 5
    print(1,a+b)
  `
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe("haha 1, 7")
  })
});

describe("with function declaration", () => {
  test("function declaration without parameters", () => {
    const source = `
    function f() {
      var a = 1;
      var b = 2;
      a +b;
    }
    f();
   `
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe(3)
  });

  test("function declaration parameters", () => {
    const source = `
    function f(x, y) {
      var a = x + 1;
      var b = y + 2;
      a +b;
    }
    f(1,2);
   `
    const ast = acorn.parse(source);
    const actual = evaluate(ast);
    expect(actual).toBe(6)
  });
});

describe("object expression", () => {
  test("simple object", () => {
    const source = `
    var a = {
      k1: "123",
      k2: "456",
      k3: 789,
    }
    a
    `
    const ast = acorn.parse(source);
    const acutal = evaluate(ast);
    expect(acutal).toEqual({
      k1: "123",
      k2: "456",
      k3: 789
    });
  });
  test("nested object", () => {
    const source = `
    var a = {
      k1: "123",
      k2: "456",
      k3: {
        n1: 123,
        n2: "456",
        n3: 789
      },
    }
    a
    `
    const ast = acorn.parse(source);
    const acutal = evaluate(ast);
    expect(acutal).toEqual({
      k1: "123",
      k2: "456",
      k3: {
        n1: 123,
        n2: "456",
        n3: 789
      }
    });
  });
  test("object value is expression", () => {
    const source = `
    var x = 10;
    var y = 20;
    var a = {
      k1: "123",
      k2: 5 + 6,
      k3: {
        n1: 123,
        n2: "456",
        n3: x + y
      },
    }
    a
    `
    const ast = acorn.parse(source);
    const acutal = evaluate(ast);
    expect(acutal).toEqual({
      k1: "123",
      k2: 11,
      k3: {
        n1: 123,
        n2: "456",
        n3: 30
      }
    });
  });
});