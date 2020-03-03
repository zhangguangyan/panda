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