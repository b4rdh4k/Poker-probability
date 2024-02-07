function combinations(arr, k) {//funksioni per me i gjeneru te gjitha kombinimet e mundshme te cfaredo madhesie prej nje vargu
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

function isStraight(cards){ //funksion i cili e shikon nese letrat tona e krijojne nje straight
    const ranks = cards.map(card => Math.floor(card/4));
    const uniqueRanks = new Set(ranks);
    if (uniqueRanks.size !== 5) return false;

    const sortedRanks = Array.from(uniqueRanks).sort((a, b) => a - b);
    return sortedRanks[4] - sortedRanks[0] === 4;
}

function isFlush(cards){ //funlsioni i cili e shikon nese letrat tona e krijojne nje flush
    const suits = cards.map(card => card % 4);
    return new Set(suits).size === 1;
}

function countRanks(cards){ //funksion i cili i mbledh te gjitha dukurite/shfaqjet (occurences) te cdo rangu
    const ranks = {};
    cards.forEach(card => {
        const rank = Math.floor(card / 4);
        ranks[rank] = ranks[rank] ? ranks[rank] + 1 : 1;
    });
    return ranks;
}

function determineHandRanking(cards){
    const rankCounts = countRanks(cards);
    const rankValues = Object.values(rankCounts);

    if (isStraight(cards) && isFlush(cards)) {
        // Royal flush or straight flush, dallojne sepse royal flush ka nje kombinim te vecante me letrat mbreterore.
        //Per dallimin mes llojeve te poker hands, mund te lexoni ne readme.
        const ranks = cards.map(card => Math.floor(card / 4));
        const uniqueRanks = new Set(ranks);
        if (uniqueRanks.has(0) && uniqueRanks.has(12)) {
            return 9; // Royal flush
        }
        return 8; // Straight flush
    }else if (rankValues.includes(4)) {
        return 7; // Four of a kind
    }else if (rankValues.includes(3) && rankValues.includes(2)) {
        return 6; // Full house
    }else if (isFlush(cards)) {
        return 5; // Flush
    }else if (isStraight(cards)) {
        return 4; // Straight
    }else if (rankValues.includes(3)) {
        return 3; // Three of a kind
    }else if (rankValues.filter(value => value === 2).length === 2) {
        return 2; // Two pair
    }else if (rankValues.includes(2)) {
        return 1; // One pair
    }else {
        return 0; // High card
    }
}
function calculateProbabilities(){
    const allCards = Array.from({length: 52}, (_, i) => i);
    const allCombinations = combinations(allCards, 5);
    const handCounts = Array(10).fill(0);

    allCombinations.forEach(combination => {
        const handRanking = determineHandRanking(combination);
        handCounts[handRanking]++;
    });

    const totalHands = allCombinations.length;
    const probabilities = handCounts.map(count => count / totalHands);

    //llojet e poker hands prej asaj me probabilitet me te larte te shfaqjes, tek ajo me probabilitet me te ulet (High card -> Royal flush)
    const handNames = [
        'High card',
        'One pair',
        'Two pair',
        'Three of a kind',
        'Straight',
        'Flush',
        'Full house',
        'Four of a kind',
        'Straight flush',
        'Royal flush'
    ];

    const rankedHands = handNames.map((name, index) => ({name, probability: probabilities[index]}));
    rankedHands.sort((a, b) => b.probability - a.probability);
    return rankedHands;
}

function main(){
    const rankedHands = calculateProbabilities();
    console.log(rankedHands);
    rankedHands.forEach((hand, index) => {
        console.log(`${index + 1} ${hand.probability * 100}% ${hand.name}`);
    });
}

main();