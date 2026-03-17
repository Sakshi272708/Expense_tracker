console.log("js file is running")
const balanceEl = document.getElementById("balance");
const amountIn = document.getElementById("income-amount");
const expenseEl = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");
console.log(descriptionEl);

function savetransaction() {
    localStorage.setItem("transactions", JSON.stringify(transactionarr))
}

//update UI of transaction list after load also, //to make objects visible 
let transactionarr = [];
function addtransaction(transaction) {
    
    //to make objects visible 
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.dataset.id = transaction.id;
    if (transaction.amount > 0) {
        li.classList.add("income");
    }
    else {
        li.classList.add("expense");
    }

    // description
    const descSpan = document.createElement("span");
    descSpan.textContent = transaction.description;

    // amount
    const amountSpan = document.createElement("span");
    amountSpan.textContent = "$" + transaction.amount;

    //dlt btn
    const dltbtn = document.createElement("button");
    dltbtn.classList.add("delete-btn");
    dltbtn.innerText = "X";

    dltbtn.addEventListener("click", function (e) {
        transactionarr = transactionarr.filter(function (item) {
            return item.id !== transaction.id;
        });
        li.remove();
        updateValues()
    });

    li.appendChild(descSpan);
    li.appendChild(amountSpan);
    li.appendChild(dltbtn);

    transactionList.appendChild(li);

}


function updateValues() {
    // get amount only from array
    const amounts = transactionarr.map(function (transaction) {
        return transaction.amount;
    });
    // caculate total balance
    const total = amounts.reduce(function (acc, item) {
        return acc + item;
    }, 0);
    //calcualte total income
    const income = amounts.filter(function (item) {
        return item > 0;
    }).reduce(function (acc, item) {
        return acc + item;
    }, 0)
    //calculate total expense
    const expense = amounts.filter(function (item) {
        return item < 0;
    }).reduce(function (acc, item) {
        return acc + item;
    }, 0)
    // to display it positive as it will be a negitive Number
    // Math.abs(expense)

    //update UI 
    balanceEl.textContent = "$" + total;
    amountIn.textContent = "$" + income;
    expenseEl.textContent = "$" + Math.abs(expense);
};

//to submit and to things happen after submit
transactionForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // read values
    const description = descriptionEl.value.trim();
    const amount = Number(amountEl.value);
    //transaction object
    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
    };

    transactionarr.push(transaction);
    savetransaction();
    updateValues();
    addtransaction(transaction);

    descriptionEl.value = "";
    amountEl.value = "";
});

//load data
function loaddata() {
    let data = localStorage.getItem("transactions");

    if (data) {
        transactionarr = JSON.parse(data);
    }

    transactionarr.forEach(function (transaction) {
        addtransaction(transaction)
    })

    updateValues()
};

loaddata();