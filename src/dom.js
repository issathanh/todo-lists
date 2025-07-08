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
        displayTodoCard(todo)
        
        form.reset()
    })
})

function createTodoCard(todo){
    //1. Create the card element
    let card = document.createElement('div')
    card.className = 'todo-card'
    //2. Add todo information (title, desccription, priority)
    const todoInfo = todo.getAllInfo()
    card.dataset.todoId = todoInfo.id 

    let title = document.createElement('h2')
    title.textContent = todoInfo.title
    card.appendChild(title)

    let description = document.createElement('p')
    description.textContent = todoInfo.description
    card.appendChild(description)

    let status = document.createElement('p')
    status.textContent = todoInfo.complete? 'Completed': 'Pending'
    status.style.color = todoInfo.complete? 'green':'orange'
    card.appendChild(status)
    //3. Addd the three button (delete, cpmplete, edit)

    let deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.addEventListener('click', function(){
        //Get the todo ID from the card
        const todoId = card.dataset.todoId; 

        //Delete from TodoManger
        TodoManager.deleteTodo(todoId)

        //Remove card from page
        card.remove()

        console.log('Todo delted')

    })

    let completeBtn = document.createElement('button')
    completeBtn.textContent = 'Complete'
    completeBtn.addEventListener('click', function(){
        //Get the todo ID
        const todoId = card.dataset.todoId  

        //Find the todo and toggle its completion 
        const allTodos = TodoManager.getAllTodos()
        const currentTodo = allTodos.find( t => t.getAllInfo().id == todoId)

        if (currentTodo){
            //Toggle completion status
            currentTodo.setComplete()

            //Get updated status
            const isComplete = currentTodo.getAllInfo().complete

            //update the status text and color
            status.textContent = isComplete ? 'Completed' : 'Incomplete'
            status.style.color = isComplete ? 'green' : 'red'

            //update button
            completeBtn.textContent = isComplete? 'Incomplete' : 'Complete'
        }
    })
    let editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    
    card.appendChild(deleteBtn)
    card.appendChild(completeBtn)
    card.appendChild(editBtn)
    //4. Return the completed card element 
    return card
}

function displayTodoCard(todo){
    const card = createTodoCard(todo)
    const todosDisplay = document.getElementById('todos-display')
    todosDisplay.appendChild(card)
}