function combinations(arr, k) {
    var result = [];
    function combine(startIndex, combination){
        if (combination.length === k) {
            result.push(combination.slice());
            return;
        }
        for (let i=startIndex; i<arr.length; i++){
            combination.push(arr[i]);
            combine(i+1, combination);
            combination.pop();
        }
    }
    combine(0, []);
    return result;
}
