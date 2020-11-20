import * as acorn from 'acorn';
import { safeLoad } from 'js-yaml';
import { myprint } from './built-in';

export function traverse(x: any) {
    if (isArray(x)) {
        traverseArray(x);
    } else { //if ((typeof x === 'object') && (x !== null)) {
        traverseObject(x);
    }
}

function traverseArray(arr: any[]) {
    arr.forEach(function (x: any) {
        traverse(x);
    });
}

function traverseObject(obj: any) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
            if (typeof obj[key] === 'string') {
                obj[key] = evaluateFragment(obj[key]);
            } else {
                traverse(obj[key]);
            }
    }
}

function isArray(o: any) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

const globalScope = new Map();

export function setupContext() {
    globalScope.set("a1", 1);
    globalScope.set("a2", 2);
}

function evaluateFragment(ss: string) {
    //const node: any = acorn.parse('`' + ss + '`');
    const node: any = acorn.parse(`\`${ss}\``, { ecmaVersion: "latest" });
    const templateLiteral = node.body[0].expression;
    return evaluate(templateLiteral);
}

function evaluate(node: any) {
    switch (node.type) {
        case "TemplateLiteral":
            return evalTemplateLiteral(node);
        case "CallExpression":
            return evalCallExpression(node);
        case "Identifier":
            return evalIdentifier(node);
        case "Literal":
            return evalLiteral(node);
    }
}

function evalIdentifier(node: any) {
    const name = node.name;
    if (globalScope.get(name)) {
        return globalScope.get(name);
    } else {
        throw new Error(`${name} not defined`);
    }
}

function evalTemplateLiteral(node: any) {
    const expressions = node.expressions.map((e1: any) => evaluate(e1));
    const heads = node.quasis.slice(0, -1);
    const tail = node.quasis[node.quasis.length - 1];

    const strings = heads.reduce((s: string, current: any, index: number) => (
        s += current.value.raw + expressions[index]
    ), "");
    return strings.concat(tail.value.raw);
}

function evalCallExpression(node: any) {
    const args = node.arguments.map((arg: any) => evaluate(arg));
    const callee = node.callee.name;
    if (callee === "print") {
        return myprint(args[0], args[1]);
    } else {
        throw new Error(`Function not defined: ${node.callee.name}`);
    }
}

function evalLiteral(node: any) {
    return node.value;
}

/**
 * 
 * @param params {a1: 1, a2: 2}
 * @param template 
 */
export function render(params: any, template: string) {
    const input: any = safeLoad(template);
    const args = Object.entries<any>(input.parameters);
    for (const [name, values] of args) {
        if (params[name]) {
            globalScope.set(name, params[name]);
        } else {
            throw new Error();
        }
    };

    traverse(input.resources);
    return input.resources;
} 