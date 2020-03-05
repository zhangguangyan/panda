import { myprint } from './built-in';

const globalScope = new Map();

export function evaluate(node: any): any {
    switch (node.type) {
        case "Program":
            return evalProgram(node);
        case "ExpressionStatement":
            return evalExpressionStatement(node);
        case "BinaryExpression":
            return evalBinaryExpression(node);
        case "CallExpression":
            return evalCallExpression(node);
        case "VariableDeclaration":
            return evalVariableDeclaration(node);
        case "VariableDeclarator":
            return evalVariableDeclarator(node);
        case "FunctionDeclaration":
            return evalFunctionDeclaration(node);
        case "BlockStatement":
            return evalBlockStatement(node);
        case "Identifier":
            return evalIdentifier(node);
        case "Literal":
            return evalLiteral(node);
        default:
            throw new Error("????");
    }
}

function evalProgram(node: any) {
    return evalStatements(node.body);
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

function evalCallExpression(node: any) {
    const args = node.arguments.map((arg: any) => evaluate(arg))
    const callee = node.callee.name;
    if (callee === "print") {
        return myprint(args[0], args[1]);
    } else if (globalScope.get(callee)) {
        const func = globalScope.get(callee);
        func.params.forEach((param: any, index: number) => {
            globalScope.set(param.name, args[index]);
        });
        return evaluate(func.body);
    } else {
        throw new Error(`Error: ${node}`);
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

function evalFunctionDeclaration(node: any) {
    const id = node.id.name;
    globalScope.set(id, node);
    return node;
}

function evalBlockStatement(node: any) {
    return evalStatements(node.body);
}

function evalIdentifier(node: any) {
    const name = node.name;
    if (globalScope.get(name)) {
        return globalScope.get(name);
    } else {
        throw new Error(`${name} not defined`);
    }
}
