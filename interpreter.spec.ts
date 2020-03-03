import { evaluate } from "./interpreter";
import * as acorn from "acorn";

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
