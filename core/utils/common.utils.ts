export function isArraySorted(arr: any[], order: 'asc' | 'desc') {
    return arr.every((val, index) => {
        if (index === arr.length - 1) return true
        return order === 'desc' ? val >= arr[index + 1] : val <= arr[index + 1]
    })
}