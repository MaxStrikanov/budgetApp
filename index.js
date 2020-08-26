'use strict'

const btnCalc = document.getElementById('start'); 
const btnAddAmount = document.getElementsByTagName('button')[0];
const btnAddExpenses = document.getElementsByTagName('button')[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];  
const salaryAmount = document.querySelector('.salary-amount');
const incomeAmount = document.querySelector('.income-amount');
const expensesTitle = document.querySelector('.expenses-items [placeholder=Наименование]');
const expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositBank = document.querySelector('.deposit-bank');
const targetAmount = document.querySelector('.target-amount ');
const periodSelect = document.querySelector('.period-select');
const incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector('.period-amount');
const btnReset = document.getElementById('cancel');
const leftColumn = document.querySelectorAll('.data input[type=text]');
const resultReset = document.querySelectorAll('.result input[type=text]');

class AppData {
  constructor() {

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
  }

  start() {
    
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
  showResult() {
  
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ')
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', this.calcSavedMoney)

  };
  addExpensesBlock() {
    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);  
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, this);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if(expensesItems.length === 3){
        btnAddExpenses.style.display = 'none';
    }
    
  };
  addIncomeBlock() {
    let cloneincomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneincomeItem, this);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
        this.style.display = 'none';
    }
    
  };
  getExpenses() {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;    
        }
    })
    
  };
  getIncome() {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){ 
            this.income[itemIncome] = cashIncome;
        }
    })
    
  };
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== ''){
            this.addExpenses.push(item);
        }
    })
  };
 getAddIncome() {
    additionalIncomeItem.forEach((item) => {
       let itemValue = item.value.trim();
       if (item !== ''){
           this.addIncome.push(itemValue);
       } 
    })
  };
  getExpensesMonth() {

    for (let key in this.expenses) {

      this.expensesMonth += +this.expenses[key];

    }
    return this.expensesMonth;

  };
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);

  };
  getTargetMonth() {

    return targetAmount.value / this.budgetMonth;

  };
  statusIncome() {
    (this.budgetDay >= 1200) ? console.log('У вас высокий уровень дохода') :
    (this.budgetDay >= 600 && this.budgetDay < 1200) ? console.log('У вас средний уровень дохода') :
    (this.budgetDay < 600) ? console.log('К сожалению у вас уровень дохода ниже среднего') :
    (this.budgetDay == 0) ? console.log('У вас 0') :
    console.log('Что то пошло не так');
  };
  getInfoDeposit() {
      if(this.deposit) {
          this.persentDeposit = prompt('Какой годовой процент?', 10);
          this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
  };
  calcSavedMoney() {
    return this.budgetMonth * periodSelect.value;
  };
  changeRange() {
    
   return periodAmount.innerHTML = periodSelect.value;
  
  };
  reset() {

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

  eventsListeners () {
    
    const _this = this;

    btnCalc.addEventListener( 'click', _this.start.bind(_this));
    btnAddExpenses.addEventListener( 'click', _this.addExpensesBlock );
    btnAddAmount.addEventListener( 'click', _this.addIncomeBlock );
    periodSelect.addEventListener( 'input', _this.changeRange );
    periodSelect.addEventListener( 'input', _this.showResult.bind(_this) );
    btnReset.addEventListener( 'click', _this.reset.bind(_this) );
  };

};

const appData = new AppData();

console.log(appData); 

appData.eventsListeners();