const balance = document.getElementById("balance"),
  money_plus = document.getElementById("money-plus"),
  money_minus = document.getElementById("money-minus"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

// let dummyTransactions = [
//   { id: 1, text: "one", amount: -20 },
//   { id: 2, text: "two", amount: 300 },
//   { id: 3, text: "three", amount: -10 },
//   { id: 4, text: "four", amount: 150 }
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// add new entry
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    // check id and ensure unique
    if (transactions.filter(elem => elem.id === transaction.id)) {
      transaction.id = generateID();
    }

    transactions.push(transaction);
    console.log(transactions);
    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// generate transaction id
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

// add transactions to DOM list
function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}N${formatMoney(
    +Math.abs(transaction.amount)
  )}</span> <button class='delete-btn' onclick='deleteTransaction(${
    transaction.id
  })'>x</button>
  `;

  list.appendChild(item);
}

// update the balance, income and expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount),
    total = +amounts.reduce((a, b) => a + b, 0).toFixed(2),
    income = +amounts
      .filter(a => a > 0)
      .reduce((a, b) => a + b, 0)
      .toFixed(2),
    expense = +Math.abs(
      amounts.filter(a => a < 0).reduce((a, b) => a + b, 0)
    ).toFixed(2);

  // get sign
  const sign = total < 0 ? "-" : "";

  // update balance
  balance.innerText = `${sign}N${formatMoney(Math.abs(total))}`;

  // update income
  money_plus.innerText = `+N${formatMoney(income)}`;

  // update expenses
  money_minus.innerText = `-N${formatMoney(expense)}`;
}

// remove transaction by ID
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// update local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// format number as money
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// event listeners
form.addEventListener("submit", addTransaction);
