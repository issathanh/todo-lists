//name and description will be given to use by the user
//wrap the function to hide the counter

const TodoManager = (function () {
    let todoId = 0;
    let todos = [];
    //check if item is complete
    const getComplete = (state) => ({
        getComplete: () => console.log(state.complete)

    })

    //toggle completion 
    const setComplete = (state) => ({
        setComplete: () => state.complete = !(state.complete)
    })
    //get all info 
    const getAllInfo = (state) => ({
        getAllInfo: () => ({
            id: state.id,
            title: state.title,
            description: state.description,
            priority: state.priority,
            complete: state.complete,
            createdDate: state.createdDate
        })
    })
    //return the whole array
    function getAllTodos() {
        return todos
    }

    //delete todo by id
    function deleteTodo(id) {
        console.log('Trying to delete ID:', id, 'Type:', typeof id);

        //find the index of the todo with matching ID
        const index = todos.findIndex(todo => {
            const todoId = todo.getAllInfo().id;
            return todoId == id; 
        });

        console.log('Found index:', index);

        if (index !== -1) {
            todos.splice(index, 1) // remove 1 item at that index 
            saveTodos()
            console.log('Todo deleted and saved');
        } else {
            console.log('Todo not found!');
        }

    }
    function createItem(title, description, priority) {
        todoId++;

        let state = {
            id: todoId,
            title: title,
            description: description,
            priority: priority,
            complete: false,
            createdDate: new Date()
        };

        const newTodo = Object.assign(
            getComplete(state),
            setComplete(state),
            getAllInfo(state)
        );

        todos.push(newTodo);
        saveTodos();
        return newTodo;
    }

    //save to local stroage
    function saveTodos() {
        const todoData = todos.map(todo => todo.getAllInfo())
        localStorage.setItem('todos', JSON.stringify(todoData))
        console.log('Todos Saved to Local Storage')

    }
    //load todo 
    function loadTodos() {

        const savedTodos = localStorage.getItem('todos')


        if (savedTodos) {
            const todoData = JSON.parse(savedTodos)

            todos = []

            todoData.forEach(data => {

                //recreate each todo object with methods
                const newTodo = Object.assign(
                    getComplete(data),
                    setComplete(data),
                    getAllInfo(data)
                )
                todos.push(newTodo)
            })

            // Update todoId counter to prevent ID conflicts
            if (todos.length > 0) {
                todoId = Math.max(...todos.map(todo => todo.getAllInfo().id));
            }




        }
    }
    //return the functions you want to expose
    return {
        createItem: createItem,
        getAllTodos: getAllTodos,
        deleteTodo: deleteTodo,
        saveTodos: saveTodos,
        loadTodos: loadTodos
    }
})();

