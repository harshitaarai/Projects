let transactions = JSON.parse(localStorage.getItem("transactions")) || []

let chart

function updateUI(){

const list=document.getElementById("list")

list.innerHTML=""

let income=0
let expense=0

let categories={}

transactions.forEach((t,i)=>{

const li=document.createElement("li")

li.className=t.type==="income"?"income-item":"expense-item"

li.innerHTML=`
${t.desc} (${t.category}) - ₹${t.amount}
<button onclick="deleteTransaction(${i})">X</button>
`

list.appendChild(li)

if(t.type==="income"){

income+=Number(t.amount)

}else{

expense+=Number(t.amount)

if(!categories[t.category]){

categories[t.category]=0

}

categories[t.category]+=Number(t.amount)

}

})

document.getElementById("income").innerText="₹"+income
document.getElementById("expense").innerText="₹"+expense
document.getElementById("balance").innerText="₹"+(income-expense)

updateChart(categories)

localStorage.setItem("transactions",JSON.stringify(transactions))

}

function addTransaction(){

const desc=document.getElementById("desc").value
const amount=document.getElementById("amount").value
const category=document.getElementById("category").value
const type=document.getElementById("type").value

if(desc===""||amount==="") return

transactions.push({

desc,
amount,
category,
type

})

document.getElementById("desc").value=""
document.getElementById("amount").value=""

updateUI()

}

function deleteTransaction(i){

transactions.splice(i,1)

updateUI()

}

function updateChart(data){

const ctx=document.getElementById("chart")

const labels=Object.keys(data)
const values=Object.values(data)

if(chart) chart.destroy()

chart=new Chart(ctx,{

type:"doughnut",

data:{

labels:labels,

datasets:[{

data:values

}]

}

})

}

function toggleTheme(){

document.body.classList.toggle("dark")

}

updateUI()