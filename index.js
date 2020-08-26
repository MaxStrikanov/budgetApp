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
let resultReset = document.querySelectorAll('.result input[type=text]');

const AppData = function () {

  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.incomeMonth = 0;
  this.deposit = false;
  this.persentDeposit = 0;
  this.moneyDeposit = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.budget = 0;

};

  AppData.prototype.start = function() {
    
    if( salaryAmount.value === ''){
      btnCalc.setAttribute("disabled", "disabled");
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        
    }else {
      
      btnCalc.removeAttribute("disabled");
      btnCalc.style.display = 'none';
      btnReset.style.display = 'block';
      leftColumn.forEach((el) => {
        el.setAttribute("disabled", "disabled");
      });
       
    }

    this.budget = +salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
   
  };
  AppData.prototype.showResult = function() {
  
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ')
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', this.calcSavedMoney)

  };
  AppData.prototype.addExpensesBlock = function() {
    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);  
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, this);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if(expensesItems.length === 3){
        btnAddExpenses.style.display = 'none';
    }
    
  };
  AppData.prototype.addIncomeBlock = function() {
    let cloneincomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneincomeItem, this);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
        this.style.display = 'none';
    }
    
  };
  AppData.prototype.getExpenses = function() {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;    
        }
    })
    
  };
  AppData.prototype.getIncome = function() {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){ 
            this.income[itemIncome] = cashIncome;
        }
    })
    
  };
  AppData.prototype.getAddExpenses = function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== ''){
            this.addExpenses.push(item);
        }
    })
  };
 AppData.prototype.getAddIncome = function() {
    additionalIncomeItem.forEach((item) => {
       let itemValue = item.value.trim();
       if (item !== ''){
           this.addIncome.push(itemValue);
       } 
    })
  };
  AppData.prototype.getExpensesMonth = function() {

    for (let key in this.expenses) {

      this.expensesMonth += +this.expenses[key];

    }
    return this.expensesMonth;

  };
  AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);

  };
  AppData.prototype.getTargetMonth = function() {

    return targetAmount.value / this.budgetMonth;

  };
  AppData.prototype.statusIncome = function() {
    (this.budgetDay >= 1200) ? console.log('У вас высокий уровень дохода') :
    (this.budgetDay >= 600 && this.budgetDay < 1200) ? console.log('У вас средний уровень дохода') :
    (this.budgetDay < 600) ? console.log('К сожалению у вас уровень дохода ниже среднего') :
    (this.budgetDay == 0) ? console.log('У вас 0') :
    console.log('Что то пошло не так');
  };
  AppData.prototype.getInfoDeposit = function() {
      if(this.deposit) {
          this.persentDeposit = prompt('Какой годовой процент?', 10);
          this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
  };
  AppData.prototype.calcSavedMoney = function() {
    return this.budgetMonth * periodSelect.value;
  };
  AppData.prototype.changeRange = function() {
    
   return periodAmount.innerHTML = periodSelect.value;
  
  };
  AppData.prototype.reset = function() {

    resultReset.forEach((el) => {
      el.value = '';
    });

    leftColumn.forEach((el) => {
      el.value = ''
      el.removeAttribute("disabled");
      periodAmount.innerHTML = '0';
    });

    btnCalc.style.display = 'block';
    btnReset.style.display = 'none'; 

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      btnAddAmount.style.display = 'block';
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      btnAddExpenses.style.display = 'block';
    }

    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.persentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.budget = 0

  };

  AppData.prototype.eventsListeners = function () {
    
    const _this = this;

    btnCalc.addEventListener( 'click', _this.start.bind(_this));
    btnAddExpenses.addEventListener( 'click', _this.addExpensesBlock );
    btnAddAmount.addEventListener( 'click', _this.addIncomeBlock );
    periodSelect.addEventListener( 'input', _this.changeRange );
    periodSelect.addEventListener( 'input', _this.showResult.bind(_this) );
    btnReset.addEventListener( 'click', _this.reset.bind(_this) );
  };

const appData = new AppData();

console.log(appData); 

appData.eventsListeners();




