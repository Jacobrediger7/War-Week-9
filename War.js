// Class representing a single card
class Card {
    // Static properties for ranks and suits
    static ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    static suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

    // Constructor initializes a card with a rank and suit
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    // Returns a string representation of the card
    toString() {
        return `${this.rank} of ${this.suit}`;
    }

    // Compares this card to another card based on rank
    compareTo(other) {
        return Card.ranks.indexOf(this.rank) - Card.ranks.indexOf(other.rank);
    }
}

// Class representing a deck of cards
class Deck {
    // Constructor initializes a deck with 52 cards and shuffles them
    constructor() {
        this.cards = [];
        for (let suit of Card.suits) {
            for (let rank of Card.ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
        this.shuffle();
    }

    // Shuffles the deck of cards
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // Deals the deck into two halves, one for each player
    deal() {
        return [this.cards.slice(0, 26), this.cards.slice(26, 52)];
    }
}

// Class representing a player
class Player {
    // Constructor initializes a player with a name, an empty hand, and a score of 0
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

    // Plays (removes and returns) the top card from the player's hand
    playCard() {
        return this.hand.shift();
    }

    // Increments the player's score by 1
    addPoint() {
        this.score += 1;
    }
}

// Class representing the game
class Game {
    // Constructor initializes the game with two players and deals hands
    constructor(player1Name, player2Name) {
        this.deck = new Deck();
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name);
        this.dealHands();
    }

    // Deals the shuffled cards to the players
    dealHands() {
        const [hand1, hand2] = this.deck.deal();
        this.player1.hand = hand1;
        this.player2.hand = hand2;
    }

    // Simulates a round where each player plays a card
    playRound() {
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();
        console.log(`${this.player1.name} plays ${card1}`);
        console.log(`${this.player2.name} plays ${card2}`);

        const comparison = card1.compareTo(card2);
        if (comparison > 0) {
            this.player1.addPoint();
            console.log(`${this.player1.name} wins the round\n`);
        } else if (comparison < 0) {
            this.player2.addPoint();
            console.log(`${this.player2.name} wins the round\n`);
        } else {
            console.log("It's a tie!\n");
        }
    }

    // Plays the game until all cards are played, then declares the winner
    playGame() {
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            this.playRound();
        }

        console.log(`Final Score:\n${this.player1.name}: ${this.player1.score}\n${this.player2.name}: ${this.player2.score}`);
        if (this.player1.score > this.player2.score) {
            console.log(`${this.player1.name} wins the game!`);
        } else if (this.player1.score < this.player2.score) {
            console.log(`${this.player2.name} wins the game!`);
        } else {
            console.log("The game is a tie!");
        }
    }
}

// Run the game
const game = new Game("Player 1", "Player 2");
game.playGame();
