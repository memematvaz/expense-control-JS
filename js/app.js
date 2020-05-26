const budgetAsk = prompt('¿Cual es tu presupuesto mensual?');



let quantityBudget;

const form = document.getElementById('add-expense')
const primary = document.querySelector('.primary')


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
        const budgetSpan = document.querySelector('span#total');
        const restSpan = document.querySelector('span#rest');

        budgetSpan.innerHTML = `${quantity}`;
        restSpan.innerHTML = `${quantity}`;
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

}




function submit(e) {
    e.preventDefault();
    const nameExpense = document.querySelector('#expense').value;
    const quantityExpense = document.querySelector('#quantity').value;



    const userInterface = new Interface();

    if (nameExpense === '' || quantityExpense === '' ||  isNaN(quantityExpense)) {   userInterface.responseSubmit('Hubo un error', 'error')
    } else {
        userInterface.responseSubmit('Agregado' , 'correcto');
     
        nameExpense === ''; 
        quantityExpense === '';

        userInterface.addExpenseList(nameExpense, quantityExpense);
    }




}