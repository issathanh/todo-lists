function initializeForm(){
    //get form reference
    const form = document.getElementById('create-todo')

    
    //listen for form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const priority = document.getElementById('priority').value
        //create new todo
        const todo = TodoManager.createItem(title, description, priority)
        //test 
        displayTodoCard(todo)

        form.reset()
    })
}