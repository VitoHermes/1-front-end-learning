// greedy algorithm
// 贪心算法
// 每次都选择当前最优解，不考虑全局最优解
// 贪心算法只能得到局部最优解，不能得到全局最优解

const child = [1, 2, 5];
const cookie = [1, 2, 2, 3];

const findContentChildren = (children: number[], cookies: number[]): number => {
    children.sort((a, b) => a - b);
    cookies.sort((a, b) => a - b);

    let childIndex = 0;
    let cookieIndex = 0;

    while (childIndex < children.length && cookieIndex < cookie.length) {
        if (children[childIndex] <= cookies[cookieIndex]) {
            childIndex++;
        }
        cookieIndex++;
    }

    return childIndex;
}

// 新问题：每个孩子可以吃多个饼干
const findContentChildrenMultipleCookies = (children: number[], cookies: number[]): number => {
    children.sort((a, b) => a - b);
    cookies.sort((a, b) => a - b);

    let satisfiedChildren = 0;
    let cookieIndex = 0;
    let remainingCookies = [...cookies];

    for (let i = 0; i < children.length; i++) {
        const childGreed = children[i];
        let currentGreed = childGreed;


        while (currentGreed > 0 && cookieIndex < remainingCookies.length) {
            if (remainingCookies[cookieIndex] <= currentGreed) {
                currentGreed -= remainingCookies[cookieIndex];
                remainingCookies.splice(cookieIndex, 1);
            } else {
                cookieIndex++;
            }
        }

        // 如果孩子被完全满足
        if (currentGreed <= 0) {
            satisfiedChildren++;
        }
    }

    return satisfiedChildren;
}

console.log("原问题结果（每个孩子只能吃一个饼干）:", findContentChildren(child, cookie));
console.log("新问题结果（每个孩子可以吃多个饼干）:", findContentChildrenMultipleCookies(child, cookie));