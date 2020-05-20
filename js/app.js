const budgetAsk = prompt('¿Cual es tu presupuesto semanal?');
let quantityBudget;


document.addEventListener('DOMContentLoaded', function() {
    if (budgetAsk === null || budgetAsk === '' || isNaN(budgetAsk)) {
        window.location.reload();

    } else {
        quantityBudget = new Budget(budgetAsk)

        const userInterface = new Interface();
        userInterface.addBudget(quantityBudget.budget)
    }
});

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
}