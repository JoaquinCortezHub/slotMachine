//Project date: 09/01/2023

//1. Deposite some money: Done
//2. Determine number of lines to bet: Done
//3. Collect a bet amount: Done
//4. Spin slot machine: Done
//5. Check if user won
//6. Give user their winnings
//7. Play agin.

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
	A: 2,
	B: 4,
	C: 6,
	D: 8,
};

const SYMBOL_VALUES = {
	A: 5,
	B: 4,
	C: 3,
	D: 2,
};

const deposit = () => {
	while (true) {
		const depositAmount = prompt("Enter a deposit amount: ");
		const numberDepositAmount = parseFloat(depositAmount); //converts a string to a number.

		if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
			console.log("Invalid deposit amount, try again.");
		} else {
			return numberDepositAmount;
		}
	}
};

const getNumberOfLines = () => {
	while (true) {
		const Lines = prompt("Enter the number of lines to bet on (1-3): ");
		const numberOfLines = parseFloat(Lines); //converts a string to a number.

		if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
			console.log("Invalid number of lines, try again.");
		} else {
			return numberOfLines;
		}
	}
};

const getBet = (balance, lines) => {
	while (true) {
		const bet = prompt("Enter the bet per line: ");
		const numberBet = parseFloat(bet); //converts a string to a number.

		if (
			isNaN(numberBet) ||
			numberBet <= 0 ||
			getNumberOfLines > balance / lines
		) {
			console.log("Invalid bet, try again.");
		} else {
			return numberBet;
		}
	}
};

const spin = () => {
	//contains all available symbols.
	const symbols = [];
	//loops through all the entries in SYMBOLS_COUNT and return the keys and values.
	for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
		for (let i = 0; i < count; i++) {
			symbols.push(symbol);
		}
	}
	//these are the reels that are containing the symbols.
	const reels = [];
	for (let i = 0; i < COLS; i++) {
		reels.push([]);
		//copies all the available symbols to have an unique array to pick from.
		const reelSymbols = [...symbols];
		for (let j = 0; j < ROWS; j++) {
			//picks random symbol and inserts it in the reel.
			const randomIndex = Math.floor(Math.random() * reelSymbols.length);
			const selectedSymbol = reelSymbols[randomIndex];
			reels[i].push(selectedSymbol);
			reelSymbols.splice(randomIndex, 1);
		}
	}
	return reels;
};

const transpose = (reels) => {
	const rows = [];
	for (let i = 0; i < ROWS; i++) {
		rows.push([]);
		for (let j = 0; j < COLS; j++) {
			rows[i].push(reels[j][i]);
		}
	}
	return rows;
};

const printRows = (rows) => {
	for (const row of rows) {
		let rowString = "";
		for (const [i, symbol] of row.entries()) {
			rowString += symbol;
			if (i != row.length - 1) {
				rowString += " | ";
			}
		}
		console.log(rowString);
	}
};

const getWinnings = (rows, bet, lines) => {
	let winnings = 0;
	for (let row = 0; row < lines; row++) {
		const symbols = rows[row];
		let allSame = true;
		for (const symbol of symbols) {
			if (symbol != symbol[0]) {
				allSame = false;
				break;
			}
		}
		if (allSame) {
			winnings += bet * SYMBOL_VALUES[symbols[0]];
		}
	}
	return winnings;
};

const game = () => {
	let balance = deposit();

	while (true) {
		console.log("You have a balance of $" + balance);
		const numberOfLines = getNumberOfLines();
		const bet = getBet(balance, numberOfLines);
		balance -= bet * numberOfLines;
		const reels = spin();
		const rows = transpose(reels);
		printRows(rows);
		const winnings = getWinnings(rows, bet, numberOfLines);
		balance += winnings;
		console.log("You won, $" + winnings);

		if (balance <= 0) {
			console.log("You ran out of money :(");
			break;
		}

		const playAgain = prompt("Do you want to play again? (Y/N)?");

		if (playAgain != "y") {
			break;
		}
	}
};

game();
