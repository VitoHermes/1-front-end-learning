// https://leetcode.com/problems/can-place-flowers/description/
// can place flowers

// 贪心算法：从左到右遍历，遇到可以种花的位置就立即种花
function canPlaceFlowersGreedy(flowerbed: number[], n: number): boolean {
    if (n === 0) return true;

    let count = 0;
    const length = flowerbed.length;

    for (let i = 0; i < length; i++) {
        // 检查当前位置是否可以种花
        // 条件：当前位置为0，且左右相邻位置都为0（或边界）
        if (flowerbed[i] === 0) {
            const leftEmpty = (i === 0) || (flowerbed[i - 1] === 0);
            const rightEmpty = (i === length - 1) || (flowerbed[i + 1] === 0);

            if (leftEmpty && rightEmpty) {
                flowerbed[i] = 1; // 立即种花
                count++;

                // 如果已经种够了，提前返回
                if (count >= n) return true;
            }
        }
    }

    return count >= n;
}

// 原来的实现（分情况处理）
function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    const length = flowerbed.length;
    if (n === 0) return true;
    if (length === 1) return flowerbed[0] === 0 && n <= 1;
    if (length === 2) return (flowerbed[0] === 0 && flowerbed[1] === 0 && n <= 1);

    let plant = 0;

    // 处理第一个位置
    if (flowerbed[0] === 0 && flowerbed[1] === 0) {
        plant++;
        flowerbed[0] = 1;
    }

    // 处理中间位置
    for (let i = 1; i < length - 1; i++) {
        if (flowerbed[i] === 0 && flowerbed[i - 1] === 0 && flowerbed[i + 1] === 0) {
            plant++;
            flowerbed[i] = 1;
        }
    }

    // 处理最后一个位置
    if (flowerbed[length - 1] === 0 && flowerbed[length - 2] === 0) {
        plant++;
        flowerbed[length - 1] = 1;
    }

    return plant >= n;
}

// 测试用例
console.log("=== 贪心算法测试 ===");
console.log(canPlaceFlowersGreedy([1, 0, 0, 0, 1], 1)); // true
console.log(canPlaceFlowersGreedy([1, 0, 0, 0, 1], 2)); // false
console.log(canPlaceFlowersGreedy([0, 0, 1, 0, 0], 1)); // true
console.log(canPlaceFlowersGreedy([0], 1)); // true
console.log(canPlaceFlowersGreedy([0, 0], 1)); // true
console.log(canPlaceFlowersGreedy([0, 0], 2)); // false

console.log("\n=== 原算法测试 ===");
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 1)); // true
console.log(canPlaceFlowers([1, 0, 0, 0, 1], 2)); // false
console.log(canPlaceFlowers([0, 0, 1, 0, 0], 1)); // true
console.log(canPlaceFlowers([0], 1)); // true
console.log(canPlaceFlowers([0, 0], 1)); // true
console.log(canPlaceFlowers([0, 0], 2)); // false
