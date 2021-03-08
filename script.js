'use strict';

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//Displays movements on interface

const displayMovements = (movements) => {
	containerMovements.innerHTML = '';
	movements.forEach((mov, i) => {
		const type = mov > 0 ? 'deposit' : 'withdrawal';

		const html = `
          <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
			i + 1
		} ${type}</div>
            <div class="movements__value">${mov}€</div>
          </div>
        `;

		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
};
displayMovements(account1.movements);

//Displays Balance

const calcDisplayBalance = (movements) => {
	const incomes = movements
		.filter((mov) => mov > 0)
		.reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = `${incomes}€`;
};
calcDisplayBalance(account1.movements);

//Displays Charges

const calcDisplayCharges = (movements) => {
	const wastedMoney = movements
		.filter((mov) => mov < 0)
		.reduce((acc, mov) => acc + mov, 0);
	labelSumOut.textContent = `${wastedMoney}€`;
};
calcDisplayCharges(account1.movements);

//Displays Interest
const calcDisplayInterest = (movements) => {
	const interest = movements
		.filter((mov) => mov > 0)
		.map((deposit) => (deposit * 1.2) / 100)
		.filter((int) => {
			return int > 1;
		})
		.reduce((acc, int) => acc + int, 0);
	labelSumInterest.textContent = `${interest}`;
};
calcDisplayInterest(account1.movements);

//Currency conversion
const eurToUsd = 1.2;
const movementsUsd = movements.map((mov) => {
	return mov * eurToUsd;
});

const totalInUSD = movements
	.filter((mov) => mov > 0)
	// .map((mov) => mov * eurToUsd)
	.map((mov, arr, i) => {
		console.log(arr);
		return mov * eurToUsd;
	})

	.reduce((acc, mov) => acc + mov, 0);

console.log(totalInUSD);
console.log(`the total in USD IS ${totalInUSD}`);

const movementsDesriptions = movements.map((mov, i) => {
	return `Movement ${i + 1}: You ${
		mov > 0 ? 'deposited' : 'withdrew'
	} ${Math.abs(mov)}`;
	// if (mov > 0) {
	// 	return `Movement ${i + 1}: You deposited ${mov}`;
	// } else {
	// 	return `Movement ${i + 1}: You withdrew ${mov}`;
	// }
});
console.log(movementsDesriptions);

const currencies = new Map([
	['USD', 'United States Dollar'],
	['EUR', 'Euro'],
	['GBP', 'Pound sterling'],
]);

const calcPrintBalance = (movements) => {
	const balance = movements.reduce((accu, mov) => {
		return accu + mov;
	}, 0);
	labelBalance.textContent = `${balance} €`;
};
calcPrintBalance(movements);

const max = movements.reduce((acc, mov) => {
	if (acc > mov) {
		return acc;
	} else {
		return mov;
	}
}, movements[0]);
console.log(max);

// Generate Usernames
// const user = account1.owner;

// const createUsername = (user) => {};
// const userName = user
// 	.toLowerCase()
// 	.split(' ')
// 	.map((name) => {
// 		return name[0];
// 	})
// 	.join('');
// console.log(userName);

const createUsername = (accs) => {
	accs.forEach((acc) => {
		acc.username = acc.owner
			.toLowerCase()
			.split(' ')
			.map((name) => {
				return name[0];
			})
			.join('');
	});

	// const userName = user
	// 	.toLowerCase()
	// 	.split(' ')
	// 	.map((name) => {
	// 		return name[0];
	// 	})
	// 	.join('');
	// return userName;
};
// console.log(createUsername(user));

createUsername(accounts);
console.log(accounts);

//Filter
const deposits = movements.filter((mov) => {
	return mov > 0;
});

console.log(deposits);

const depositsFor = [];

for (const mov of movements)
	if (mov > 0) {
		depositsFor.push(mov);
		console.log(depositsFor);
	}

const withdrawals = movements.filter((mov) => {
	return mov < 0;
});

console.log(withdrawals);

//Reduce
const blnce = movements.reduce((accu, curnt, i, arr) => {
	console.log(`Iteration #${i}: ${accu}`);
	return accu + curnt;
}, 0);
console.log(blnce);
