This repository holds a project made for the class of Mathematics for Computer Science, taught by instructor: Armend Shabani for the educational technology institute LIFE from Gjirafa. 
<br>For the completion of this project, I have decided to take on the problem of finding the probabilities of each type of hand in five-card poker and ranking the types of hands by their probability. 
<br>This is directly inspired by the book "Discrete mathematics and its applications" by Kenneth H. Rossen. 
You can find it in the 7th chapter of the book (Discrete probability, pg. 525) under the section of "Computations and Explorations), exercise 1.

      Executing the program:
For ease of access, you can run this js program using an online javascript compiler, like https://playcode.io/new <br>
Or, if you already have a code editor installed (e.g VS Code), you can use the Code Runner extension, or alternatively use node.js.<br><br>

      Explanation of poker hands
A five-card stud poker is a classic game of chance, in which each player is dealt five cards, the winner is the player with the best five-card hand wins.
There are 9 kinds of cards (in my code there are ten, as there is a slight difference between Royal and Straight flush but it's too small to count as a different hand).
  1. _Straight flush_: five cards of the same suit in sequence, such as: 2♥, 3♥, 4♥, 5♥, 6♥
  2. _Four of a kind_: four cards of the same rank, such as: 2♠, 2♥, 2♦, 2♣, 3♥
  3. _Full house_: three cards of one rank and two of another rank, such as 2♠, 2♥, 2♦, 3♣, 3♥
  4. _Flush_: five cards of the same suit with at least one card out of sequence, such as 2♦, 3♦, 5♦, 6♦, Q♦
  5. _Straight_: five cards in sequence, with at least two cards of different suits. Ace can be high or low, but not both. Thus, A♠, 2♥, 3♦, 4♣, 5♥ and 10♠, J♥, Q♦, K♣, A♥ are valid straights; but Q♠, K♥, A♦, 2♣, 3♥ is not.
  6. _Three of a kind_: three cards of the same rank and two cards of different ranks, such as 2♠, 2♥, 2♦, 9♣, Q♥
  7. _Two pair_: two cards of equal rank, two other cards of equal but different rank, and another card of different rank, such as A♠, A♥, 5♦, 5♣, 7♥
  8. _One pair_: two cards of equal rank and three cards of different rank, such as 8♠, 8♥, 2♦, J♣, K♥
  9. _High card_: five cards of different rank with at least two different suits, such as 3♥, 5♥, Q♦,K♣, A♥<br>
  
As I mentioned before, I added _Royal flush_ to the code as well, just because it's more fun and rarer than regular straight flush, as it takes 10♥, J♥, Q♥, K♥, A♥.
<br><br><br>
**Where is discrete mathematics useful in poker?**<br><br>
The game of five-card stud poker is a statistical experiment, because every deal can have more than one possible outcome, every possible outcome can be specified in advance and most importantly:
the outcome of the experiment depends purely on chance.

    Calculating poker probability <br><br>
To be able to count the probability of each hand, we need to know how many possible hands can be dealt from a standard deck of 52 cards and how many number of hands can be dealt for a particular type. 
In short, we use this formula;<br>
  **Probability =	Number of hands of a particular type / Number of possible hands**

    Counting all possible combinations
To count the combination of all possible hands, we need to use a formula:<br>
  **nCr = n(n - 1)(n - 2)...(n - r + 1)/r! = n! / r!(n - r)!**<br><br>
Since our topic is about five-card stud poker from a standard deck of 52 cards, we come to the usable formula and number:<br>
  **52C5 = 52! / 5!(52 - 5)! = 52! / 5!47! = _2,598,960_**<br><br>

    Finding the probability of a particular type of hand
  <br>For ease of explanation, I will be explaining the finding of the probability of a Royal Flush. <br><br>
  There are only five cards that can make a royal flush: a 10, a jack, a queen, a king and an ace.<br> Within these, there are only 4 possible combinations (of suits) that are not repetitive.<br>
  10♠, J♠, Q♠, K♠, A♠<br>
  10♥, J♥, Q♥, K♥, A♥<br>
  10♦, J♦, Q♦, K♦, A♦<br>
  10♥, J♥, Q♥, K♥, A♥<br><br>
    From the formula of probability we can find:<br>
      Probability = 4 / 2,598,860<br>
  So, the probability of you being dealt a royal flush is 0.000001539.
<br><br><br>

    Code Explanation
The code is a JavaScript program that calculates the probabilities of different poker hands. <br>
It consists of several functions that perform different tasks.<br>
  -The main function is **calculateProbabilities**, which generates all possible combinations of five cards from a standard 52-card deck, and then determines the hand ranking for each combination using the **determineHandRanking** function. The hand ranking is a number from 0 to 9, where 0 is the lowest (high card) and 9 is the highest (royal flush). <br>-The **calculateProbabilities** function also counts how many times each hand ranking occurs, and divides it by the total number of combinations to get the probability. It then returns an array of objects, each containing the name and probability of a hand ranking, sorted from most to least likely. The other functions are helper functions that are used by the **determineHandRanking** function. <br>-The **combinations** function takes an array and a number k as parameters and returns an array of all possible combinations of k elements from the array.<br> -The **isStraight** function checks if the cards form a straight, which is a sequence of five cards with consecutive ranks.<br> -The **isFlush** function checks if the cards form a flush, which is a set of five cards with the same suit. <br>-The **countRanks** function counts how many times each rank appears in the cards, and returns an object with the rank as the key and the count as the value. <br>-The **determineHandRanking** function uses these helper functions and some logic to identify the type of hand and return the corresponding hand ranking.<br> -The code also includes a **main** function that calls the **calculateProbabilities** function and prints the results to the console.
<br><br>
p.s. If you're not in the mood for poker and discrete maths, watch Casino Royale as a pre-requisite :3.
