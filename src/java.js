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
            complete: state.complete
        })
    })
    //return the whole array
    function getAllTodos(){
        return todos
    }

    //delete todo by id
    function deleteTodo(id){
        //find the index of the todo with matching ID
        const index = todos.findIndex(todo => todo.getAllInfo().id === id); 

        if (index !== -1){
            todos.splice(index,1) // remove 1 item at that index 
        }
        
    }
    function createItem(title, description, priority) {
        todoId++;

        let state = {
            id: todoId,
            title: title,
            description: description,
            priority: priority,
            complete: false
        };

        const newTodo = Object.assign(
            getComplete(state),
            setComplete(state),
            getAllInfo(state)
        );
        
        todos.push(newTodo); 
        return newTodo; 
    }
    //return the functions you want to expose
    return {
        createItem: createItem,
        getAllTodos: getAllTodos,
        deleteTodo: deleteTodo
    }
})();

const todo1 = TodoManager.createItem('Buy groceries', 'Milk, bread', 'high');
const todo2 = TodoManager.createItem('Walk dog', 'Take Rex out', 'low');
console.log(TodoManager.getAllTodos().length); // Should be 2
TodoManager.deleteTodo(1);  // Delete the first todo
console.log(TodoManager.getAllTodos().length); // Should be 1
