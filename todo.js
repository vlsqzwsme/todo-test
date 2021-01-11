const list = document.querySelector('.list');
const form = document.querySelector('.new-todo');
const addButton = document.querySelector('.new-todo').querySelector('.add');
const usernameForm = document.querySelector('.username');
const removes = document.querySelectorAll('.remove');
const done = document.querySelector('.done');
const save = document.querySelector('.save');
const add = document.querySelector('.add');

// check current session user and load todos

const username = sessionStorage.getItem('current');

const todoTemplate = (todo) => {
    const html = `
    <li class="hello" id="${todo.id}">
        <h3>${todo.title}</h3>
        <p>${todo.description}</p>
        <p>${todo.date}</p>
        <button class="btn btn-success isdone">Done</button>
        <button class="btn btn-warning edit">Edit</button>
        <button class="btn btn-danger remove">Remove</button>
    </li>
    `;
    list.innerHTML += html;
};


// ______LOAD TODOS______
const loadTodos = (username) => {
    allTodos = JSON.parse(localStorage.getItem(username)); // USERNAME

    allTodos.forEach(todo => {
        todoTemplate(todo);
    });
}

if (localStorage.getItem(username) === '') {
    allTodos = [];
} else if (localStorage.getItem(username)) {
    loadTodos(username)
}


// ______ADD A NEW TODO_______

const addTodo = (todo, id) => {
    allTodos.push(todo);
    //adding it to local storage
    localStorage.setItem(username, JSON.stringify(allTodos));      // USERNAME

    // creating html template with new object and adding it to html
    todoTemplate(todo);
};
addButton.addEventListener('click', e => {
    e.preventDefault();
    const title = form.title.value.trim();
    const description = form.desc.value.trim();
    const date = form.date.value.trim();
    
    if (title !== '' && description !== ''){
        const todoID = e.timeStamp;
        const todo = {
            title: title,
            description: description,
            date: date,
            id: todoID
        };
        addTodo(todo, e.timeStamp);
    }
    form.reset();
});




//___________DONE___________
const doneTodo = (id) => {
    allTodos.forEach(todo => {
        if (id == todo.id) {
    
            document.getElementById(id).classList.toggle("done");
        }
    });
};
list.addEventListener('click', e => {
    if (e.target.classList.contains('isdone')) {
        doneTodo(e.target.parentElement.id);
    }
});





// __________REMOVE__________
const removeTodo = (id) => {
    allTodos.forEach(todo => {
        if (id == todo.id) {
            const index = allTodos.indexOf(todo);
            allTodos.splice(index, 1);
        }
    });
    
    localStorage.setItem(username, JSON.stringify(allTodos));
    list.innerHTML = '';
    loadTodos(username);
};
list.addEventListener('click', e => {
    if (e.target.classList.contains('remove')) {
        // delete function
        removeTodo(e.target.parentElement.id);
    }
});


// __________EDIT__________
const editTodo = (editID) => {
    allTodos.forEach(todo => {
        if (editID == todo.id) {
            form.title.value = todo.title;
            form.desc.value = todo.description;
            form.date.value = todo.date;
            const todoID = todo.id;

            save.style.display = "block";
            add.style.display = "none";

            let index = allTodos.indexOf(todo);

            save.addEventListener('click', e => {
                e.preventDefault();

                const title = form.title.value.trim();
                const description = form.desc.value.trim();
                const date = form.date.value.trim();
                const editedTodo = {
                    title: title,
                    description: description,
                    date: date,
                    id: todoID
                };
          
                allTodos[index] = editedTodo;

                localStorage.setItem(username, JSON.stringify(allTodos));
                list.innerHTML = '';
                loadTodos(username);


                form.reset();
                save.style.display = "none";
                add.style.display = "block";
            }, { once: true });
        }
    });

};
list.addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        // edit function
        editTodo(e.target.parentElement.id);
    }
});




// Quit from account
const quit = () => {
    window.location="index.html";
    sessionStorage.setItem('current', '');
}