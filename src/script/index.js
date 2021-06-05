/**
* Todolist
*/
const app = {
  init: function() {
    app.makeForminDOM();
    app.makeInputInDOM();
    app.makeTitleInDOM();
    app.makeTasksInDOM('Ajouter une tâche');
    app.form.addEventListener('submit',app.handleSubmit);
  },
  //pour construire l'ensemble dans le dom on a besoin de créer 4 éléments au sein de la div todo qui jouera le role de conteneur
  // 1 élément form
  // 1 text input
  // 1 h2
  //les cards taches
  
  //on declare form globalement dans app pour pouvoir y accéder plus facilement
  form : document.createElement('form'),
  
  /**
  * makeForminDOM crée un formulaire qui va contenir tout nos inputs
  */
  makeForminDOM:() => {
    const todoContainer = document.getElementById('todo');
    todoContainer.appendChild(app.form);
    app.form.classList.add('todo__form');
  },
  
  /**
  * makeInputInDOM permet de crée l'input principal permettant d'ajouter une date à la liste
  */ 
  makeInputInDOM:() => {
    const taskAdder = document.createElement('input');
    app.form.appendChild(taskAdder);
    taskAdder.type='text';
    taskAdder.placeholder='Ajouter une tâche';
    taskAdder.classList.add('todo__form__task-adder');
  },
  
  /**
  * makeTitleInDOM crée le titre du formulaire
  */ 
  makeTitleInDOM:() =>{
    const h2 = document.createElement('h2');
    app.form.insertBefore(h2, app.form.children[1]);
    h2.classList.add('todo__form__task-title');
    const allTasks = document.querySelectorAll('.task__label');
    h2.textContent=`${allTasks.length} tâches en cours`;
  },
  
  /**
  * MakeTasksInDOM permet de créer les taches dans le dom avec la valeur de l'input texte
  * @param {string} content valeur de l'input text
  */ 
  makeTasksInDOM: (content)=>{
    const taskContainer = document.createElement('div');
    app.form.appendChild(taskContainer);
    const taskLabel = document.createElement('label');
    const taskInput = document.createElement('input');
    taskInput.setAttribute('type', 'checkbox');
    taskLabel.textContent=content;
    //pour generer un id unique on va utiliser un bon vieux math.random
    const taskID = `task${Math.floor(Math.random() * 100)}`;
    taskInput.setAttribute('id', taskID);
    taskLabel.setAttribute('for',taskID);
    
    taskLabel.className=('task__label');
    taskContainer.className=('task__card');
    taskInput.className=('task__checkbox');
    taskContainer.append(taskInput);
    taskContainer.append(taskLabel);

    taskInput.addEventListener('click', app.taskCounter);
    
    const taskChecked =document.querySelectorAll('.--checked');
    const allTasks = document.querySelectorAll('.task__checkbox');

    let checkedTaskCount = allTasks.length - taskChecked.length;
    const h2 = document.querySelector('.todo__form__task-title');
    h2.textContent=`${checkedTaskCount} tâches en cours`;

  },
  
  /**
  * 
  * @param {*} event 
  * Handlesubmit est le callback de l'evenement de submit du form elle fait appel a la création de chaque tache
  */
  handleSubmit(event) {
    event.preventDefault();
    let taskAdder =document.querySelector('.todo__form__task-adder');
    app.makeTasksInDOM(taskAdder.value);
    taskAdder.value=null;
    
  },
  
  taskCounter:(event)=>{
    event.target.classList.toggle('--checked');
    const taskChecked =document.querySelectorAll('.--checked');
    const allTasks = document.querySelectorAll('.task__checkbox');

    let checkedTaskCount = allTasks.length - taskChecked.length;
    const h2 = document.querySelector('.todo__form__task-title');
    h2.textContent=`${checkedTaskCount} tâches en cours`;
    const taskContainer = event.target.closest('div');
    taskContainer.classList.toggle('--active');
  },

  
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.init);
