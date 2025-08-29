// 贪心算法
// 问题：给定一个数组，每个元素代表一个孩子的评分，每个孩子至少分配一个糖果，相邻的孩子评分高的孩子糖果数比评分低的孩子多，求最少需要多少糖果
// 正向遍历，如果当前孩子评分比前一个孩子评分高，则当前孩子糖果数为前一个孩子糖果数加1
// 反向遍历，如果当前孩子评分比后一个孩子评分高，则当前孩子糖果数为后一个孩子糖果数加1
// 取正向遍历和反向遍历的最大值
function candy(ratings: number[]): number {
    const candy = new Array(ratings.length).fill(1);
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candy[i] = candy[i - 1] + 1;
        }
    }
    for (let i = ratings.length - 1; i > 0; i--) {
        if (ratings[i - 1] > ratings[i]) {
            candy[i - 1] = Math.max(candy[i - 1], candy[i] + 1);
        }
    }
    return candy.reduce((acc, curr) => acc + curr, 0);
}
console.log(candy([5, 4, 3, 2, 1]));