const commande = [];

class Commande {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    totalPrice() {
        return this.price * this.quantity;
    }

    display() {
        return `${this.quantity} x ${this.name} - Total ${this.totalPrice().toFixed(2)}€`;
    }
}

const comandeGlobal = [];

const ajouter = document.querySelector("button");
const produit = document.querySelector(".produit");
const prix = document.querySelector(".prix");
const quantite = document.querySelector(".quantite");
const liste = document.querySelector(".liste");

function resetForm() {
    produit.value = '';
    prix.value = '';
    quantite.value = '';
}

function add(name, price, quantity) {
    comandeGlobal.push(new Commande(name, price, quantity));
    resetForm();
}

function afficher() {
    const ul = document.querySelector(".liste");
    ul.innerHTML = '';
    comandeGlobal.forEach((comande, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${comande.display()} <button class="supprimer" data-index="${index}">supprimer</button>`;
        ul.append(li);
    })
}

function totalPrice() {
    return comandeGlobal.reduce((total, commande) => {
        return total + commande.totalPrice();
    }, 0);
}

function afficherTotal() {
    const p = document.querySelector(".prix-total");
    if (!comandeGlobal.length) {
        p.innerHTML = 'Total Global : 0 €';
    } else {
        p.innerHTML = `Total Global : ${totalPrice().toFixed(2)}€`;
    }
}

afficherTotal();

ajouter.addEventListener('click', (e) => {
    e.preventDefault();
    add(produit.value, prix.value, quantite.value);
    afficher();
    afficherTotal();
})

liste.addEventListener("click", e => {
    if (e.target.classList.contains("supprimer")) {
        const index = e.target.getAttribute("data-index");
        comandeGlobal.splice(index, 1);
        afficher();
        afficherTotal();
    }
})