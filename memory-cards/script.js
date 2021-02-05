const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const deleteBtn = document.querySelector('.delete-btn');

// track current card
let currentActiveCard = 0;

// store DOM cards
const cardsEl = [];

// store card data
const cardsData = getCardsData();

const dummyCardsData = [
  {
    question: 'What is a variable?',
    answer: 'Container for a piece of data',
  },
  {
    question: 'What must a variable begin with?',
    answer: 'A letter, $ or _',
  },
  {
    question: 'What is PHP?',
    answer: 'A Programming Language',
  },
  {
    question: 'What is React JS??',
    answer: 'A Javascript Library for creating user interfaces.',
  },
];

// set empty text
if (!cardsData.length) {
  [prevBtn, nextBtn, clearBtn, deleteBtn].forEach(
    (btn) => (btn.disabled = true)
  );
  cardsContainer.innerHTML = `
  <p class="empty-message">No Cards Available. <br/> <br/> Please add a card <br/> <br/> or </p>
  <button class="btn">Add Dummy Cards</button>
  `;
}

// loop through data and create cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// create a single card in DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if (index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = ` 
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${data.answer}
        </p>
      </div>
    </div>
    `;

  card
    .querySelector('.inner-card')
    .addEventListener('click', () => card.classList.toggle('show-answer'));

  // add cards to DOM
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// show number of cards
function updateCurrentText() {
  currentEl.innerText = ` ${currentActiveCard + 1}/${cardsEl.length}`;
}

// get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// add cards to local storage
function setCardsData(data) {
  localStorage.setItem('cards', JSON.stringify(data));
  window.location.reload();
}

// @todo delete individual cards
function deleteCard(currentActiveCard) {}

createCards();

// event listeners
// next button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard++;

  if (currentActiveCard === cardsEl.length) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// prev button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard--;

  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// add card button
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value.trim();
  const answer = answerEl.value.trim();

  if (question && answer) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

// clear all cards
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

// delete active card

deleteBtn.addEventListener('click', (e) => {
  // console.log(cardsData[currentActiveCard]);
  newCardsData = cardsData.filter(
    (card) => card.question !== cardsData[currentActiveCard].question
  );
  setCardsData(newCardsData);
});

if (!cardsData.length) {
  const addDummyButton = document.querySelector('p.empty-message + button');

  addDummyButton.addEventListener('click', (e) => {
    setCardsData(dummyCardsData);
  });
}
