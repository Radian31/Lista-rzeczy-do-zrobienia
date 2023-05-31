{
    let tasks = [];
    let hideDoneTask = false;


    const addNewTask = (newTaskContent) => {
        tasks=[...tasks,
            {content: newTaskContent},
        ];
        render();
    };

   
    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex +1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {...tasks[taskIndex],
                done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex +1),
        ];
        render();
    };
    
    const markAllTaskDone =() => {
        tasks = tasks.map((task)=>({
            ...task,
            done:true,
        }))
        render();
    };


    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
                render();
            })
        })
    };
        
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
                render();
            })
        })
    }

    const renderTasks = () => {
        const tasksToHTML = task => `
             <li class="tasks__content ${task.done && hideDoneTasks ? " tasks__content--hidden" : ""} js-tasks">
                 <button 
                     class="tasks__button tasks__button--toggleDone js-toggleDone"
                 >
                     ${task.done ? "✔" : ""}
                 </button>
                 <span
                     ${task.done ? "class=tasks__name--done" : "class=tasks__name"}
                 >
                     ${task.content}
                 </span>
                 <button 
                     class="tasks__button tasks__button--remove js-remove"
                 >
                     🗑
                 </button>
             </li>
         `;
         const tasksElement = document.querySelector(".js-tasks");
         tasksElement.innerHTML = tasks.map(tasksToHTML).join("");
     };

     const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button
                class="buttons__button js-toogleHideDoneTasks"
                >
                    ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button 
                class="buttons__button js-markAllDone" 
                    ${tasks.every(({ done }) => done) ? "disabled" : ""}
                >
                Ukończ wszystkie
            </button>
        `;
    };
    const render = () => {
        renderTasks();
        renderButtons();


    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim("");
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        };
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };
    init();
}

