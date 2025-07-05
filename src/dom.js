//wait for the page to load
document.addEventListener('DOMContentLoaded', function(){
    //get form reference
    const form = document.getElementById('create-todo')

    //listen for form submission
    form.addEventListener('submit', function(e){
        e.preventDefault()

        const title = document.getElementById('title').value
        const description = document.getElementById('description').value
        const priority = document.getElementById('priority').value
        //create new todo
        const todo = TodoManager.createItem(title,description,priority)
        //test 
        console.log('todo created', todo.getAllInfo())
        console.log('All todos: ', TodoManager.getAllTodos())

        form.reset()
    })
})