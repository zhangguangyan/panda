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
