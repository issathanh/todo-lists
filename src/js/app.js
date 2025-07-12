document.addEventListener('DOMContentLoaded', function () {
    TodoManager.loadTodos()

    //Display loaded todo
    const loadedTodos = TodoManager.getAllTodos()
    loadedTodos.forEach(todo=>{
        displayTodoCard(todo)
    })
    initializeForm();
})