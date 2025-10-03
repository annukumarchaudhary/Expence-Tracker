// Select elements
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("transaction-form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Get transactions from localStorage or empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add transaction
form.addEventListener("submit", function(e) {
  e.preventDefault();
  if(text.value.trim() === "" || amount.value.trim() === "") return;

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  addTransactionDOM(transaction);
  updateValues();
  updateLocalStorage();
  text.value = "";
  amount.value = "";
});

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// Add transaction to DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "expense" : "income");
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)} ₹</span>
    <button onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
}

// Update balance, income, expense
function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0);
  const income = amounts.filter(a => a > 0).reduce((acc, item) => acc + item, 0);
  const expense = amounts.filter(a => a < 0).reduce((acc, item) => acc + item, 0);

  balance.innerText = `${total} ₹`;
  money_plus.innerText = `${income} ₹`;
  money_minus.innerText = `${Math.abs(expense)} ₹`;
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  init();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initialize app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
