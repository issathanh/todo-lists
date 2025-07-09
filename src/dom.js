//wait for the page to load
document.addEventListener('DOMContentLoaded', function () {
    //get form reference
    const form = document.getElementById('create-todo')

    function switchToEditMode(titleElement, descElement, editButton, card){
        //Store original values for cancel functionality
        const originalTitle = titleElement.textContent 
        const originalDesc = descElement.textContent

        //create input elements 
        const titleInput = document.createElement('input')
        titleInput.type = 'text'
        titleInput.value = originalTitle

        const descTextarea = document.createElement('textarea')
        descTextarea.value = originalDesc 

        //Replace the text elements with the inputs
        titleElement.replaceWith(titleInput)
        descElement.replaceWith(descTextarea)

        //Create Save amd Cancel buttons
        const saveBtn = document.createElement('button')
        saveBtn.textContent = 'Save'

        const cancelBtn = document.createElement('button')
        cancelBtn.textContent = 'Cancel'

        //replace the edit button with the save and cancel btuton
        editButton.replaceWith(saveBtn, cancelBtn)

        //Add Save functionality
        saveBtn.addEventListener('click', function(){
            //save the changes and switch back to display mode
            //Get new values from inputs

            const newTitle = titleInput.value.trim()
            const newDesc = descTextarea.value.trim() //trim the white spaces before and after the word

            //validate - don't allow empty title

            if(!newTitle){
                alert('Title cannot be empty')
                return 
            }

            //update todomanager 
            const todoId = card.dataset.todoId

            //Find the todo and toggle its completion 
            const allTodos = TodoManager.getAllTodos()
            const currentTodo = allTodos.find(t => t.getAllInfo().id == todoId)

            currentTodo.title = newTitle
            currentTodo.description = newDesc


            //create new display elements with updated values
            const newTitleElement = document.createElement('h2')
            newTitleElement.textContent = newTitle 

            const newDescElement = document.createElement('p')
            newDescElement.textContent = newDesc 

            //create new edit button
            const newEditBtn = document.createElement('button')
            newEditBtn.textContent = 'Edit'

            //Replace inputs with display elements 
            titleInput.replaceWith(newTitleElement)
            descTextarea.replaceWith(newDescElement)
            saveBtn.replaceWith(newEditBtn)
            cancelBtn.remove()

            //Add edit functionality abck
            newEditBtn.addEventListener('click', function(){
                switchToEditMode(newTitleElement,newDescElement, newEditBtn, card)
            })

        })

        cancelBtn.addEventListener('click', function(){
            //Discard changes and switch back to display mode
            const restoredTitle = document.createElement('h2')
            restoredTitle.textContent = originalTitle

            const restoredDesc = document.createElement('p')
            restoredDesc.textContent = originalDesc 

            const restoredEditBtn = document.createElement('button')
            restoredEditBtn.textContent = 'Edit'

            titleInput.replaceWith(restoredTitle)
            descTextarea.replaceWith(restoredDesc)
            saveBtn.replaceWith(restoredEditBtn)
            cancelBtn.remove()
            //Add edit functionality back
            restoredEditBtn.addEventListener('click', function(){
                switchToEditMode(restoredTitle, restoredDesc, restoredEditBtn, card)
            })

        })

    }
    function createTodoCard(todo) {
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
        status.textContent = todoInfo.complete ? 'Completed' : 'Pending'
        status.style.color = todoInfo.complete ? 'green' : 'orange'
        card.appendChild(status)
        //3. Addd the three button (delete, cpmplete, edit)

        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', function () {
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
        completeBtn.addEventListener('click', function () {
            //Get the todo ID
            const todoId = card.dataset.todoId

            //Find the todo and toggle its completion 
            const allTodos = TodoManager.getAllTodos()
            const currentTodo = allTodos.find(t => t.getAllInfo().id == todoId)

            if (currentTodo) {
                //Toggle completion status
                currentTodo.setComplete()

                //Get updated status
                const isComplete = currentTodo.getAllInfo().complete

                //update the status text and color
                status.textContent = isComplete ? 'Completed' : 'Incomplete'
                status.style.color = isComplete ? 'green' : 'red'

                //update button
                completeBtn.textContent = isComplete ? 'Incomplete' : 'Complete'
            }
        })
        let editBtn = document.createElement('button')
        editBtn.textContent = 'Edit'

        editBtn.addEventListener('click', function () {
            switchToEditMode(title, description, editBtn, card)
        })

        card.appendChild(deleteBtn)
        card.appendChild(completeBtn)
        card.appendChild(editBtn)
        //4. Return the completed card element 
        return card
    }

    function displayTodoCard(todo) {
        const card = createTodoCard(todo)
        const todosDisplay = document.getElementById('todos-display')
        todosDisplay.appendChild(card)
    }
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
})

