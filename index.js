'use strict'

let btnCalc = document.getElementById('start'); 
let btnAddAmount = document.getElementsByTagName('button')[0];
let btnAddExpenses = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];  
let salaryAmount = document.querySelector('.salary-amount');
let incomeAmount = document.querySelector('.income-amount');
let expensesTitle = document.querySelector('.expenses-items [placeholder=Наименование]');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositBank = document.querySelector('.deposit-bank');
let targetAmount = document.querySelector('.target-amount ');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');
let btnReset = document.getElementById('cancel');
let leftColumn = document.querySelectorAll('.data input[type=text]');
let calcReset = document.querySelectorAll('.calc input[type=text]');

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const isString = (n) => {
  return n instanceof String
}

const validString = (str) =>{
  const nameReg = /^[а-яА-Я]{1,}$/;
  return nameReg.test(str);
};

const validNumber = (str) => {
  const nameReg = /^\d{1,}$/;
  return nameReg.test(str)
};

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  incomeMonth: 0,
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  budget: 0,
  start: function() {
    
    if( salaryAmount.value === ''){
      this.setAttribute("disabled", "disabled");
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        
    }else {
      
      this.removeAttribute("disabled");
      this.style.display = 'none';
      btnReset.style.display = 'block';
      leftColumn.forEach((el) => {
        el.setAttribute("disabled", "disabled");
      });
       
    }

    appData.budget = +salaryAmount.value;
    
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
   
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ')
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', appData.calcSavedMoney)

  },
  addExpensesBlock: function() {
    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);  
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, this);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if(expensesItems.length === 3){
        btnAddExpenses.style.display = 'none';
    }
    
  },
  addIncomeBlock: function() {
    let cloneincomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneincomeItem, this);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
        this.style.display = 'none';
    }
    
  },
  getExpenses: function() {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;    
        }
    })
    
  },
  getIncome: function() {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){ 
            this.income[itemIncome] = cashIncome;
        }
    })
    
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== ''){
            this.addExpenses.push(item);
        }
    })
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach((item) => {
       let itemValue = item.value.trim();
       if (item !== ''){
           this.addIncome.push(itemValue);
       } 
    })
  },
  getExpensesMonth: function() {

    for (let key in this.expenses) {

      this.expensesMonth += +this.expenses[key];

    }
    return this.expensesMonth;

  },
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);

  },

  getTargetMonth: function() {

    return targetAmount.value / this.budgetMonth;

  },
  statusIncome: function() {
    (this.budgetDay >= 1200) ? console.log('У вас высокий уровень дохода') :
    (this.budgetDay >= 600 && this.budgetDay < 1200) ? console.log('У вас средний уровень дохода') :
    (this.budgetDay < 600) ? console.log('К сожалению у вас уровень дохода ниже среднего') :
    (this.budgetDay == 0) ? console.log('У вас 0') :
    console.log('Что то пошло не так');
  },
  getInfoDeposit: function() {
      if(this.deposit) {
          this.persentDeposit = prompt('Какой годовой процент?', 10);
          this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
  },
  calcSavedMoney: function() {
    return this.budgetMonth * periodSelect.value;
  },
changeRange: (e) => {
    e.preventDefault();
   return periodAmount.textContent = periodSelect.value;
  
},
reset: () => {

  if (btnReset.click) {

    calcReset.forEach((el) => {
      el.value = '';
    });

    leftColumn.forEach((el) => {
      el.removeAttribute("disabled");
    });

    btnCalc.style.display = 'block';
    btnReset.style.display = 'none'; 
  } 

}
};

btnCalc.addEventListener( 'click', appData.start );
btnAddExpenses.addEventListener( 'click', appData.addExpensesBlock );
btnAddAmount.addEventListener( 'click', appData.addIncomeBlock );
periodSelect.addEventListener( 'input', appData.changeRange );
periodSelect.addEventListener( 'input', appData.showResult );
btnReset.addEventListener('click', appData.reset );



