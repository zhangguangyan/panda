import * as yaml from 'js-yaml';
import * as fs from 'fs';

import { traverse, setupContext } from './template';

test("tag template", () => {
    setupContext();
    const input = fs.readFileSync('input.yaml').toString();
    // const o2 = {
    //     k1: 'aaa${a1}bbb${a2}',
    //     k2: '${print(a1,a2)}',
    //     k3: {
    //         k31: '${print(a1,a2)}',
    //         k32: {
    //             k321: '${print(a1,a2)}',
    //             k322: {
    //                 k3221: '${print(a1,a2)}'
    //             }
    //         },
    //         k33: [
    //             {
    //                 k331: '${print(a1, 3)}'
    //             }
    //         ]
    //     }
    // };

    const o3 = yaml.safeLoad(input);
    traverse(o3);
    expect(o3).toEqual({
        k1: "aaa1bbb2",
        k2: "haha 1, 2",
        k3: {
            k31: 'haha 1, 2',
            k32: {
                k321: 'haha 1, 2',
                k322: {
                    k3221: 'haha 1, 2'
                }
            },
            k33: [
                {
                    k331: 'haha 1, 3'
                },
                {
                    k332: 'haha 1, 5'
                }
            ]
        }
    });
});

test("???", () => {
    // var s1 = "hello";
    // var s2 = "hello";

    // const r = s1 === s2;
    // expect(r).toBe(true);

    const o1 = {
        k1: "ssss"
    };

    var s3 = o1['k1'];
    const r2 = s3 === o1.k1;
    expect(r2).toBeTruthy();
    s3 = "bbbbb";
    console.log(o1.k1);

    const s4 = '${bbb}';
    const input = `\`${s4}\``;
    //const input1 = '`' + s4 + '`';
    console.log(input);

});

const a = Array.from(Array(10000).keys());

test("concat", () => {
    let s = "";
    for (let i = 0; i < 10000; i++) {
        s += "123";
    }
});

test("what", () => {
    const aa = a.reduce((a1:any) => {
        a1 += "123";
        return a1;
    },"");
});

test("array", () => {
    let s = a.map(() => "123");
    const r = s.join("");
}); 
