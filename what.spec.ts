describe("what", () => {
    test("haha", () => {
        type What = {
            [key: string]: {
                default?: string;
            }
        }
        const o1: What = {
            k1: {
                default: "hello 1"
            },
            k2: {
            }
        };

        // const a1 = Object.entries(o1).filter(kv => kv[1].default).map(kv => [kv[0], kv[1].default]);
        // console.log(a1);


        const actual = Object.keys(o1).filter(k => o1[k].default).reduce((a, c) => {
            return {
                [c]: o1[c].default,
                ...a
            }
        },{});
        expect(actual).toEqual({k1: "hello 1"})
    })
})