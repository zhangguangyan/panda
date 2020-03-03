import * as acorn from 'acorn';

export function evaluate(node: any):any {
    switch (node.type) {
        case "Program":
            return evalStatements(node.body);
        case "ExpressionStatement":
            return evalExpressionStatement(node);
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
