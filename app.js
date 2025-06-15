let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("transaction-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const list = document.getElementById("transaction-list");
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const desc = descInput.value;
  const amount = +amountInput.value;

  if (!desc || !amount) return;

  const transaction = {
    id: Date.now(),
    desc,
    amount,
  };

  transactions.push(transaction);
  saveData();
  renderTransactions();
  form.reset();
}

function renderTransactions() {
  list.innerHTML = "";
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((txn) => {
    const li = document.createElement("li");
    li.classList.add(txn.amount >= 0 ? "income" : "expense");

    li.innerHTML = `
      ${txn.desc} <span>₹${txn.amount}</span>
      <button onclick="deleteTransaction(${txn.id})">❌</button>
    `;

    list.appendChild(li);

    if (txn.amount >= 0) {
      totalIncome += txn.amount;
    } else {
      totalExpense += txn.amount;
    }
  });

  income.textContent = totalIncome;
  expense.textContent = Math.abs(totalExpense);
  balance.textContent = `Balance: ₹${totalIncome + totalExpense}`;
}

function deleteTransaction(id) {
  transactions = transactions.filter(txn => txn.id !== id);
  saveData();
  renderTransactions();
}

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

renderTransactions();
