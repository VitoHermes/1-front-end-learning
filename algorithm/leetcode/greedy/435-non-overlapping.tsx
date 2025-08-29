// 贪心算法
// 问题：给定一个数组，每个元素代表一个区间的开始和结束，求最少需要删除多少个区间，使得剩下的区间不重叠

function eraseOverlapIntervals(intervals: number[][]) {
    intervals.sort((a, b) => a[1] - b[1]); //按照结尾大小增序排序
    let count = 0;
    let end = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < end) {
            count++;
        } else {
            end = intervals[i][1];
        }
    }
    return count;
}

console.log(eraseOverlapIntervals([[1, 3], [2, 4], [3, 9], [5, 6], [7, 8]]));