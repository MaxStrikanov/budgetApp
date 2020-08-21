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

'use strict'

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

const isString = (n) => {
  return n instanceof String
}

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
  start: () => {
    
    if( salaryAmount.value === ''){
        btnCalc.setAttribute("disabled", true);
        alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
        
    }else {
        btnCalc.setAttribute("disabled", false);
    }

    appData.budget = +salaryAmount.value;
    console.log(salaryAmount.value);
    
    
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    
    appData.getAddExpenses();
    appData.getAddIncome();
    
    appData.getBudget();
    appData.showResult();
   

    // appData.getTargetMonth();
    // appData.statusIncome();
  },
  showResult: () => {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ')
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
    periodSelect.addEventListener('input', appData.calcSavedMoney)

  },
  addExpensesBlock: () => {
    
    let cloneExpensesItem = expensesItems[0].cloneNode(true);  
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnAddExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    
    if(expensesItems.length === 3){
        btnAddExpenses.style.display = 'none';
    }
  },
  addIncomeBlock: () => {
    let cloneincomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneincomeItem, btnAddAmount);
    incomeItems = document.querySelectorAll('.income-items');

    if(incomeItems.length === 3){
        btnAddAmount.style.display = 'none';
    }
  },
  getExpenses: () => {
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;    
        }
    })
  },
  getIncome: () => {
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){ 
            appData.income[itemIncome] = cashIncome;
        }
    })
    // if ( confirm('Есть ли у вас дополнительный заработок?') ) {
    
    //     let itemIncome = prompt( 'Какой у вас дополнительный заработок? ', 'Таксую');
    //     let cashIncome = prompt( 'Сколько зарабатываете на этом? ', 10000 );
    //     appData.income[itemIncome] = cashIncome;
    //     }      

    // for (let key in appData.income){
    //     appData.incomeMonth += +appData.income[key];
    // }
  },
  getAddExpenses: () => {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
        item = item.trim();
        if (item !== ''){
            appData.addExpenses.push(item);
        }
    })
  },
  getAddIncome: () => {
    additionalIncomeItem.forEach((item) => {
       let itemValue = item.value.trim();
       if (item !== ''){
           appData.addIncome.push(itemValue);
       } 
    })
  },
  getExpensesMonth: () => {

    for (let key in appData.expenses) {

      appData.expensesMonth += +appData.expenses[key];

    }
    return appData.expensesMonth;

  },
  getBudget: () => {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);

  },

  getTargetMonth: () => {

    return targetAmount.value / appData.budgetMonth;

    // if (targetMonth < 0) {
    //   console.log('Цель не будет достигнута');
    // } else console.log('Cрок достижения цели: ' + targetMonth + ' мес.');

    // return targetMonth;
  },
  statusIncome: () => {
    (appData.budgetDay >= 1200) ? console.log('У вас высокий уровень дохода') :
    (appData.budgetDay >= 600 && appData.budgetDay < 1200) ? console.log('У вас средний уровень дохода') :
    (appData.budgetDay < 600) ? console.log('К сожалению у вас уровень дохода ниже среднего') :
    (appData.budgetDay == 0) ? console.log('У вас 0') :
    console.log('Что то пошло не так');
  },
  getInfoDeposit: () => {
      if(appData.deposit) {
          appData.persentDeposit = prompt('Какой годовой процент?', 10);
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }
  },
  calcSavedMoney: () => {
    return appData.budgetMonth * periodSelect.value;
  },
changeRange: (e) => {
    e.preventDefault();
   return periodAmount.textContent = periodSelect.value;
  
}

};

btnCalc.addEventListener( 'click', appData.start );
btnAddExpenses.addEventListener( 'click', appData.addExpensesBlock );
btnAddAmount.addEventListener( 'click', appData.addIncomeBlock );
periodSelect.addEventListener( 'input', appData.changeRange );
periodSelect.addEventListener( 'input', appData.showResult );




