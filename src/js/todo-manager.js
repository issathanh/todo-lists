const TodoManager = (function () {
    let todoId = 0;
    let todos = [];

    // Check if item is complete
    const getComplete = (state) => ({
        getComplete: () => state.complete // Return the value, don’t log it
    });

    // Toggle completion
    const setComplete = (state) => ({
        setComplete: () => state.complete = !state.complete
    });

    // Get all info
    const getAllInfo = (state) => ({
        getAllInfo: () => ({
            id: state.id,
            title: state.title,
            description: state.description,
            priority: state.priority,
            complete: state.complete,
            createdDate: state.createdDate,
            dueDate: state.dueDate // Include dueDate
        })
    });

    // Return the whole array
    function getAllTodos() {
        return todos;
    }

    // Delete todo by id
    function deleteTodo(id) {
        console.log('Trying to delete ID:', id, 'Type:', typeof id);
        const index = todos.findIndex(todo => todo.getAllInfo().id == id);
        console.log('Found index:', index);
        if (index !== -1) {
            todos.splice(index, 1);
            saveTodos();
            console.log('Todo deleted and saved');
        } else {
            console.log('Todo not found!');
        }
    }

    function createItem(title, description, priority, dueDate) {
        todoId++;
        let state = {
            id: todoId,
            title: title,
            description: description,
            priority: priority,
            complete: false,
            createdDate: new Date(),
            dueDate: dueDate ? new Date(dueDate) : null // Include dueDate in state
        };

        const newTodo = Object.assign(
            {},
            { 
                title, 
                description, 
                priority, 
                complete: false, 
                createdDate: new Date(), 
                dueDate: state.dueDate,
                state // Include state for internal updates
            },
            getComplete(state),
            setComplete(state),
            getAllInfo(state)
        );

        // Sync direct properties with state
        Object.defineProperties(newTodo, {
            title: {
                get: () => state.title,
                set: (value) => state.title = value
            },
            description: {
                get: () => state.description,
                set: (value) => state.description = value
            },
            priority: {
                get: () => state.priority,
                set: (value) => state.priority = value
            },
            complete: {
                get: () => state.complete,
                set: (value) => state.complete = value
            },
            createdDate: {
                get: () => state.createdDate,
                set: (value) => state.createdDate = value
            },
            dueDate: {
                get: () => state.dueDate,
                set: (value) => state.dueDate = value
            }
        });

        todos.push(newTodo);
        saveTodos();
        return newTodo;
    }

    // Save to local storage
    function saveTodos() {
        const todoData = todos.map(todo => todo.getAllInfo());
        localStorage.setItem('todos', JSON.stringify(todoData));
        console.log('Todos Saved to Local Storage');
    }

    // Load todos
    function loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            const todoData = JSON.parse(savedTodos);
            todos = [];
            todoData.forEach(data => {
                data.dueDate = data.dueDate ? new Date(data.dueDate) : null; // Restore dueDate
                data.createdDate = new Date(data.createdDate); // Ensure createdDate is a Date
                const newTodo = Object.assign(
                    {},
                    { 
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        priority: data.priority,
                        complete: data.complete,
                        createdDate: data.createdDate,
                        dueDate: data.dueDate,
                        state: data // Include state
                    },
                    getComplete(data),
                    setComplete(data),
                    getAllInfo(data)
                );

                // Sync direct properties with state
                Object.defineProperties(newTodo, {
                    title: {
                        get: () => data.title,
                        set: (value) => data.title = value
                    },
                    description: {
                        get: () => data.description,
                        set: (value) => data.description = value
                    },
                    priority: {
                        get: () => data.priority,
                        set: (value) => data.priority = value
                    },
                    complete: {
                        get: () => data.complete,
                        set: (value) => data.complete = value
                    },
                    createdDate: {
                        get: () => data.createdDate,
                        set: (value) => data.createdDate = value
                    },
                    dueDate: {
                        get: () => data.dueDate,
                        set: (value) => data.dueDate = value
                    }
                });

                todos.push(newTodo);
            });
            if (todos.length > 0) {
                todoId = Math.max(...todos.map(todo => todo.getAllInfo().id));
            }
        }
    }

    return {
        createItem: createItem,
        getAllTodos: getAllTodos,
        deleteTodo: deleteTodo,
        saveTodos: saveTodos,
        loadTodos: loadTodos
    };
})();