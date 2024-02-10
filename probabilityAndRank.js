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
/*Funksioni combinations eshte funksion i cili gjeneron te gjitha kombinimet e mundshme te cfaredo madhesie k prej nje vargu arr.
Per shembull, nese kemi vargun [1, 2, 3, 4, 5], dhe k=3, funksioni do te gjeneroje te gjitha kombinimet e mundshme te madhesise 3 prej vargut tone.
Per me e paraqit kete rezultat, e perdor nje menyre rekursive dhe fillon me inicializiming e nje vargu bosh te quajtur result.
Brenda combinations, e kemi nje funksion tjt quajtur combine, i cili merr dy argumente, startIndex dhe combination.
Nese madhesia e kombinimit eshte e barabarte me k, atehere e shtojme ate ne rezultat.
Perndryshe, per cdo element te vargut, e shtojme ate ne kombinim dhe e therrasim funksionin combine perseri, duke e rritur startIndex me 1.
Per kete perdorim push and pop te cilat jane dukuri te stack.
*/

function isStraight(cards){ //funksion i cili e shikon nese letrat tona e krijojne nje straight
    const ranks = cards.map(card => Math.floor(card/4));
    const uniqueRanks = new Set(ranks);
    if (uniqueRanks.size !== 5) return false;

    const sortedRanks = Array.from(uniqueRanks).sort((a, b) => a - b);
    return sortedRanks[4] - sortedRanks[0] === 4;
}
/* Funksioni isStraight eshte funksion i cili e shikon nese letrat tona e krijojne nje straight.
Ne fillim e mapon secilen leter duke u bazuar ne rangun e saj, duke e ndare me 4 dhe duke e marre vleren floor.
Pastaj e krijojme nje set nga ranku per te i larguar duplikatet. Nese madhesia e setit nuk eshte e barabarte me 5, atehere dmth qe ka duplicate ranks 
edhe kjo dore nuk eshte Straight. Perndryshe, e shnderron setin ne varg, e sorton ne ascending order edhe e shikon diferencen mes rankut me te larte
dhe me te ulet, Nese diferenca eshte 4, kemi nje straight, perndryshe jo.
 */

function isFlush(cards){ //funksioni i cili e shikon nese letrat tona e krijojne nje flush
    const suits = cards.map(card => card % 4);
    return new Set(suits).size === 1;
}
/* Funksioni isFlush eshte funksion i cili e shikon nese letrat tona e krijojne nje flush.
Ne fillim e mapojme secilen leter duke u bazuar ne suitin e saj, duke e marre vleren modulo 4.  
Pastaj nga suits e krijon nje set. Nese madhesia e setit eshte 1, atehere kemi letra te te njejtit suit dhe kemi flush.
 */

function countRanks(cards){ //funksion i cili i mbledh te gjitha dukurite/shfaqjet (occurences) te cdo rangu
    const ranks = {};
    cards.forEach(card => {
        const rank = Math.floor(card / 4);
        ranks[rank] = ranks[rank] ? ranks[rank] + 1 : 1;
    });
    return ranks;
}/* Funksion `countRanks` eshte funksion i cili i mbledh te gjitha dukurite/shfaqjet (occurences) te cdo rangu.
Ne fillim inicializojme nje objekt te thate te quajtur rank, dhe iteron mbi cdo leter, e kalkulojme rankun e saj
duke e ndare me 4 dhe duke e marre floor value, dhe pastaj e bejme update the count ne ranks object.
nese ranku ekziston ne objektin ranks, e inkrementojme countin, perndryshe e inicializojme countin me 1.
 */

function determineHandRanking(cards){
    const rankCounts = countRanks(cards);
    const rankValues = Object.values(rankCounts);
        // Royal flush or straight flush, dallojne sepse royal flush ka nje kombinim te vecante me letrat mbreterore.
        //Per dallimin mes llojeve te poker hands, mund te lexoni ne readme.
    if (isStraight(cards) && isFlush(cards)) {
        const ranks = cards.map(card => Math.floor(card / 4));
        const uniqueRanks = new Set(ranks);
        if (uniqueRanks.has(8) && uniqueRanks.has(9) && uniqueRanks.has(10) && uniqueRanks.has(11) && uniqueRanks.has(12)) {
            return 9; // Royal Flush
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
/*Funksioni determineHandRanking vendos rankun e nje dore te letrave. Ne fillim i ngjen te gjitha rastet e secilit rank duke
perdorur funksioni countRanks. Pastaj, shikon kufi te ndryshem per te determinuar rankimit. 
Nese dora eshte eshte straight edhe flush, atehere shikon nese eshte Royal Flush, duke shikuar nese permban ranqet 8,9,10,11,12
te cilat reprezentojne 10, J, Q, K, A. Nese eshte kthen 9, nese nuk eshte atehere kthen 8 per straight flush.
Pastaj, vazhdon te kontrolloj te gjitha kufizimet tjera, dhe nese nuk eshte asnjera nga to, e kthen 0 e cila reprezenton
High Card apo Nothing.*/

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
    //rankimi i llojeve te poker hands sipas probabilitetit
    const rankedHands = handNames.map((name, index) => ({name, probability: probabilities[index]}));
    rankedHands.sort((a, b) => b.probability - a.probability);
    return rankedHands;
}
/* Funksioni calculateProbabilities eshte funksion i cili llogarit probabilitetin e cdo lloji te poker hands.
Ne fillim, e krijojme nje varg te quajtur allCards i cili i ka te gjitha kartat nga 0 deri 51.
Pastaj, i gjeneron te gjitha kombinimet e ketyre 5 letrave, duke perdorur funksionin combinations.
E inicializon nje varg te quajtur handCounts me 10 elemente, secili duke reprezentuar numrin e rankut te nje dore specifike.
Funksioni iteron mbi te gjitha kombinimet, duke e determinuar rankun e seciles dore, dhe duke e inkrementuar countin e rankut te doreve.
Pastaj, llogarit totalin e duarve duke marr gjatesine e vargut allCombinations. 
Me pas, e kalkulon probabilitetin e secilit rank duke e ndare countin e secilit rank me totalin e duarve, si ne formule.
Si perfundim, e krijon nje varg te quajtur rankedHands qe permban nje objekt me emrin e dores dhe probabilitetin e saj..
E merr kete varg, dhe e sorton ne descending order, duke e kthyer si rezultat ne baze te probabilitetit.

 */

function main() {
    const rankedHands = calculateProbabilities();
    console.log('Rank(M->L)\tProbability\t\tHand');
    rankedHands.forEach((hand, index) => {
        console.log(`${index + 1}\t\t${(hand.probability * 100).toFixed(6)}%\t\t${hand.name}`);
    });
}

main();
/* Funksioni main eshte "entry point" i programit. E thirr funksionit calculateProbabilities per
te marr duart e rankuara dhe probabilitetitn e tyre, dhe e printon rezultatin duke perdorur console.log
Cdo rresht permban rankun (me e larta tek me e uleta), probabilitetin (e formatuar si perqindje me 6 vende decimale)
dhe numrin e dores.
 */