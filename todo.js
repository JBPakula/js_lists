"use strict"

let ul;
let toDoForm;
let toDoList;

document.addEventListener('DOMContentLoaded', () => {
    ul = document.getElementById('toDoList');
    toDoForm = document.getElementById('toDoForm');
    let toDoNameError = document.getElementById('toDoNameError');
    let toDoDescError = document.getElementById('toDoDescError');
    
    getToDoList();

    toDoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let toDoName = event.target.elements[0];
        let toDoDesc = event.target.elements[1]; 

        if (toDoName.value.length < 3) {
            toDoName.classList.add('input-danger');
            toDoNameError.innerText = "Nazwa jest za krótka! Minimum 3 znaki.";
            console.log(toDoNameError);
        }   

        if (toDoDesc.value.length < 11) {
            toDoDesc.classList.add('input-danger');
            toDoDescError.innerText = "Opis jest za krótki! Minimum 10 znaków.";
            console.log(toDoDescError);
        }

        if (toDoName.value.length > 2) {
            toDoName.classList.remove('input-danger');
            toDoNameError.innerText = "";
        }

        if (toDoDesc.value.length > 10) {
            toDoDesc.classList.remove('input-danger');
            toDoDescError.innerText = "";
        }

        if (toDoName.value.length > 2 && toDoDesc.value.length > 10) {
            
            let newToDo = {
                name: toDoName.value,
                desc: toDoDesc.value,
                done: false
            }
        
            for (let toDo of toDoList) {
                if (toDo.name === toDoName.value && toDo.desc === toDoDesc.value) {
                    return; 
                }
            }

            toDoList.push(newToDo);  
            localStorage.setItem('toDoList', JSON.stringify(toDoList));   
            renderList();

            toDoName.value = "";
            toDoDesc.value = "";
           
        } else {
           if (toDoName.value.length < 3) {
                toDoName.classList.add('input-danger');
                toDoNameError.innerText = "Nazwa jest za krótka! Minimum 3 znaki.";
                console.log(toDoNameError);
            }   
            if (toDoDesc.value.length < 11) {
                toDoDesc.classList.add('input-danger');
                toDoDescError.innerText = "Opis jest za krótki! Minimum 10 znaków.";
                console.log(toDoDescError);
            }
        }    
    })

})

const renderList = () => {
    let liList = Array.from(ul.getElementsByTagName('li'));
    
    liList.forEach((li) => {
        let btnState = li.getElementsByTagName('btnState')[0];
        btnState.removeEventListener("click", changeTaskStatus);
    })

    ul.innerHTML = "";

    toDoList.forEach((toDo, index) => {
        let li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        
        let main = document.createElement('main');
        let heading = document.createElement('h5');
        let paragraph = document.createElement('p');
        let btnState = document.createElement('btnState');
       
        btnState.classList.add('btn', 'btn-secondary', 'btn-sm');
        btnState.addEventListener("click", changeTaskStatus)
        btnState.dataset.taskId = index;

        if(!toDo.done) {
            btnState.innerText = "remeber to do it";
            btnState.classList.add('btn', 'btn-danger', 'btn-sm')
        } else {
            btnState.innerText = "I've done it!";
            btnState.classList.add('btn', 'btn-success', 'btn-sm')
            main.style.textDecoration = "line-through";
        }
 
        heading.innerText = toDo.name;
        paragraph.innerText = toDo.desc;

        main.appendChild(heading);
        main.appendChild(paragraph);
       
        li.appendChild(main);
        li.appendChild(btnState);

        ul.appendChild(li);
    })
}

const changeTaskStatus = (event) => {
    let toDo = toDoList[Math.round(event.target.dataset.taskId)];

    if (toDo.done === true) {
        toDo.done = false;
    } else { 
        toDo.done = true 
    }

    renderList();
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

const getToDoList = () => {
    if (localStorage.getItem('toDoList')) {
       toDoList = JSON.parse(localStorage.getItem('toDoList'));
       renderList()
    } else {
       toDoList = [];
    }
}   
