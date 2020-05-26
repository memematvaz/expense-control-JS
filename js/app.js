const budgetAsk = prompt('¿Cual es tu presupuesto mensual?');

let quantityBudget;

const form = document.getElementById('add-expense')

const budgetSpan = document.querySelector('span#total');
const restSpan = document.querySelector('span#rest');



document.addEventListener('DOMContentLoaded', function() {
    if (budgetAsk === null || budgetAsk === '' || isNaN(budgetAsk)) {
        window.location.reload();

    } else {
        quantityBudget = new Budget(budgetAsk)

        const userInterface = new Interface();
        userInterface.addBudget(quantityBudget.budget)
    }
});

form.addEventListener('submit', submit)

class Budget {
    constructor(budget) {
        this.budget = Number(budget);
        this.rest = Number(budget);
    }

    budgetRest(quantity = 0) {
        return this.rest -= Number(quantity);
    }
}


class Interface {
    addBudget(quantity) {


        budgetSpan.innerText = `${quantity}`;
        restSpan.innerText = `${quantity}`;
    }

    responseSubmit(message, type) {
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert')
        //class Bootstrap styles
        if(type === 'error') {
            divMessage.classList.add('alert-danger');
        
        } else {
            divMessage.classList.add('alert-success');

        }
        divMessage.appendChild(document.createTextNode(message));
        const primary = document.querySelector('.primary')
        primary.insertBefore(divMessage, form)

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2500 )
    }

    addExpenseList(nameExpense, quantityExpense){
        const expensesList = document.querySelector('#expenses ul');

        const li = document.createElement('li');
        li.classList.add ('list-group-item','d-flex', 'justify-content-between', 'align-items-center');

        li.innerText = `${nameExpense}`;

        const spanMoney = document.createElement('span');
        spanMoney.classList.add ('badge','badge-primary', 'badge-pill');

        spanMoney.innerText = `${quantityExpense} €`;

        li.appendChild(spanMoney);


        expensesList.appendChild(li);

    }
    budgetRest(quantity) {
        const budgetRest = quantityBudget.budgetRest(quantity);

        rest.innerText = `${budgetRest}`;

        this.budgetCheck()
     }
    budgetCheck() {
       const totalBudget = quantityBudget.budget;
       const finalRest = quantityBudget.rest;

       const rest = document.querySelector('.rest');


       //25%
        if((totalBudget/4)> finalRest) {
            rest.classList.remove('alert-sucess', 'alert-warning');
            rest.classList.add('alert-danger')

      //50%
        } else if ((totalBudget/2)>= finalRest) {
            rest.classList.remove('alert-sucess', 'alert-danger');
            rest.classList.add('alert-warning')
        } else {
            rest.classList.remove('alert-sucess', 'alert-warning');
            rest.classList.add('alert-danger')
        }

     }



}




function submit(e) {
    e.preventDefault();
    const nameExpense = document.querySelector('#expense').value;
    const quantityExpense = document.querySelector('#quantity').value;



    const userInterface = new Interface();

    if (nameExpense === '' || quantityExpense === '' ||  isNaN(quantityExpense)) {   userInterface.responseSubmit('Hubo un error', 'error')
    } else {
        userInterface.responseSubmit('Agregado' , 'correcto');
        userInterface.addExpenseList(nameExpense, quantityExpense);
        userInterface.budgetRest(quantityExpense)
    }




}