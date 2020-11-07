/**
 * [ +,
 *   [+ 1, 2],
 *   3,
 * ]
 * @param exp 
 */
export function evaluate(exp: any): number {
    if (typeof exp === "number") {
        return exp;
    }
    if (exp[0] === "+") {
        let sum = 0;
        for (let i = 1; i < exp.length; i++) {
            sum += evaluate(exp[i]);
        }
        return sum;
    }
    throw new Error();
}
