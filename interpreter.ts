import * as acorn from 'acorn';

const globalScope = new Map();

export function evaluate(node: any): any {
    switch (node.type) {
        case "Program":
            return evalStatements(node.body);
        case "ExpressionStatement":
            return evalExpressionStatement(node);
        case "BinaryExpression":
            return evalBinaryExpression(node);
        case "VariableDeclaration":
            return evalVariableDeclaration(node);
        case "VariableDeclarator":
            return evalVariableDeclarator(node);
        case "Identifier":
            return evalIdentifier(node);
        case "Literal":
            return evalLiteral(node);
        default:
            throw new Error("????");
    }
}

function evalStatements(statements: any[]) {
    let result
    for (const statement of statements) {
        result = evaluate(statement);
        console.log(result);
    }
    // return the value of last statement
    return result;
}

function evalExpressionStatement(node: any) {
    return evaluate(node.expression);
}

function evalLiteral(node: any) {
    return node.value;
}

function evalBinaryExpression(node: any) {
    const left = evaluate(node.left);
    const op = node.operator;
    const right = evaluate(node.right);
    switch (op) {
        case "+":
            return left + right;
        case "-":
            return left - right;
        case "*":
            return left * right;
        case "/":
            return left / right;
        default:
            throw new Error(left + op + right)
    }
}

function evalVariableDeclaration(node: any) {
    for (const declaration of node.declarations) {
        evalVariableDeclarator(declaration);
    }
}

function evalVariableDeclarator(node: any) {
    const id = node.id.name;
    const value = evaluate(node.init);
    globalScope.set(id, value);
}

function evalIdentifier(node: any) {
    const name = node.name;
    if (globalScope.get(name)) {
        return globalScope.get(name);
    } else {
        throw new Error(`${name} not defined`);
    }
}