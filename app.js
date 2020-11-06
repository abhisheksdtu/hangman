const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const popupWord = document.getElementById('popup-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
	'html',
	'css',
	'javascript',
	'python',
	'java',
	'basic',
	'cobol',
	'sql',
	'bash',
	'bliss',
	'golang',
	'clojure',
	'dart',
	'haskell',
	'julia',
	'jscript',
	'kotlin',
	'jython',
	'matlab',
	'opencl',
	'poweshell',
	'scala',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);

// const correctLetters = ['l', 'e', 'p', 'a'];
const correctLetters = [];
const wrongLetters = [];

// SHOW THE HIDDEN WORD
function displayWord() {
	wordEl.innerHTML = `
    ${selectedWord
			.split('')
			.map(
				(letter) => `
          <span class='letter'>
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
			)
			.join('')}
  `;

	// console.log(wordEl.innerText);
	const innerWord = wordEl.innerText.replace(/\n/g, '');
	// console.log(innerWord);

	if (innerWord === selectedWord) {
		finalMessage.innerText = `Congratulations! You Won!`;
		popup.style.display = 'flex';
	}
}

// UPDATE THE WRONG LETTERS
function updateWrongLettersEl() {
	// console.log('update wrong');

	// DISPLAY WRONG LETTERS
	wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

	// DISPLAY PARTS
	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	// CHECK IF LOST
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately You Lost';
		popupWord.innerText = `${selectedWord}`;
		popup.style.display = 'flex';
	}
}

// SHOW NOTIFICATION
function showNotification() {
	// console.log('show notification');
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 1000);
}

// KEYDOWN LETTER PRESS
window.addEventListener('keydown', (e) => {
	// console.log(e.keyCode);
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		// console.log('hey');
		const letter = e.key;
		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);
				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);
				updateWrongLettersEl();
			} else {
				showNotification();
			}
		}
	}
});

// RESTART GAME AND PLAY AGAIN
playAgainBtn.addEventListener('click', () => {
	// EMPTY ARRAYS
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLettersEl();

	popup.style.display = 'none';
});

displayWord();
