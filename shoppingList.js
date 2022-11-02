"use strict"

let ul;
let inputError;
let newItemForm;
let shoppingList;

document.addEventListener('DOMContentLoaded', () => {
    ul = document.getElementById('shoppingList');
    inputError = document.getElementById('inputError');
    newItemForm = document.getElementById('newItemForm');
    getShoppingList();
 
    newItemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let input = event.target.elements[0];
        
        if (input.value.length > 2 && !input.value.startsWith(' ')) {
                
            let newItem = {
                name: input.value,
                done: false
            }

            for (let product of shoppingList) {
                if (product.name === input.value) {
                    return; 
                }
            }

            shoppingList.push(newItem);  
            localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
            renderList();

            input.value = "";
            input.classList.remove('input-danger');
            inputError.innerText = "";

        } else {
            inputError.innerText = "nazwa nie spełnia kryterów (min. 3 znaki)";
            input.classList.add('input-danger');
        }    
    })
})

const renderList = () => {
    let liList = Array.from(ul.getElementsByTagName('li'));
    
    liList.forEach((li) => {
        let button = li.getElementsByTagName('button')[0];
        button.removeEventListener("click", changeStatus);
    })

    ul.innerHTML = "";

    shoppingList.forEach((shoppingItem, index) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        
        let product = document.createElement('h5');
        let button = document.createElement('button');
        
        button.classList.add('btn', 'btn-primary', 'btn-sm');
        button.addEventListener("click", changeStatus)
        button.dataset.taskId = index;

        if(!shoppingItem.done) {
            button.innerText = "buy me";
            button.classList.add('btn', 'btn-primary', 'btn-sm')
        } else {
            button.innerText = "got it!";
            button.classList.add('btn', 'btn-success', 'btn-sm')
            product.style.textDecoration = "line-through";
        }

        product.innerText = shoppingItem.name;
        
        li.appendChild(product);
        li.appendChild(button);

        ul.appendChild(li);
    })
}

const changeStatus = (event) => {
    let shoppingItem = shoppingList[Math.round(event.target.dataset.taskId)];
    
    if (shoppingItem.done === true) {
        shoppingItem.done = false;
    } else { 
        shoppingItem.done = true 
    }
    
    renderList();
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

const getShoppingList = () => {
    if (localStorage.getItem('shoppingList')) {
       shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
       renderList()
    } else {
       shoppingList = [];
    }
}