


document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const addTaskButton = document.getElementById('adding-btn');
    const addTaskModalDialog = document.getElementById('add-task-modal'); // Dialog element for adding tasks
    const addTaskForm = document.getElementById('add-task-form');
    
    // The close button within the "Add New Task" modal
    // Scoping querySelector to the specific modal is important as IDs might be duplicated in other modals
    const closeAddTaskModalButton = addTaskModalDialog.querySelector('#close-modal-btn'); 

    // Input fields in the "Add New Task" modal (scoped to the correct modal)
    const newTaskTitleInput = addTaskModalDialog.querySelector('#task-title');
    const newTaskDescriptionInput = addTaskModalDialog.querySelector('#task-desc');
    const newTaskStatusSelect = addTaskModalDialog.querySelector('#task-status');

    const TASKS_STORAGE_KEY_FOR_ADD = 'kanbanTasks'; // Same local storage key used in script.js

    // --- Event Listener to Open the "Add New Task" Modal ---
    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            if (addTaskModalDialog) {
                addTaskModalDialog.showModal();
            }
        });
    }

    // --- Event Listener to Close the "Add New Task" Modal (via its specific close button) ---
    if (closeAddTaskModalButton) {
        closeAddTaskModalButton.addEventListener('click', () => {
            if (addTaskModalDialog) {
                addTaskModalDialog.close();
                if (addTaskForm) {
                    addTaskForm.reset(); // Reset form fields when closing
                }
            }
        });
    }

    // --- Event Listener to Close the Modal if User Clicks on the Backdrop ---
    if (addTaskModalDialog) {
        addTaskModalDialog.addEventListener('click', (event) => {
            // Check if the click is directly on the dialog backdrop
            if (event.target === addTaskModalDialog) {
                addTaskModalDialog.close();
                if (addTaskForm) {
                    addTaskForm.reset(); // Reset form fields
                }
            }
        });
    }

    // --- Event Listener for "Add New Task" Form Submission ---
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission behavior

            const title = newTaskTitleInput.value.trim();
            const description = newTaskDescriptionInput.value.trim();
            const status = newTaskStatusSelect.value;

            // Basic validation
            if (!title) {
                alert('Task title is required!');
                return;
            }

            // Load existing tasks from local storage
            let tasks = [];
            const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY_FOR_ADD);
            if (storedTasks) {
                tasks = JSON.parse(storedTasks);
            }

            // Generate a new unique ID for the task
            let newTaskId = 1;
            if (tasks.length > 0) {
                // Find the maximum current ID and add 1
                newTaskId = tasks.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
            }
            
            const newTask = {
                id: newTaskId,
                title: title,
                description: description,
                status: status,
                board: "Launch Career" // Assuming "Launch Career" as the default board, similar to initialData.js
            };

            // Add the new task to the array
            tasks.push(newTask);

            // Save the updated tasks array back to local storage
            localStorage.setItem(TASKS_STORAGE_KEY_FOR_ADD, JSON.stringify(tasks));

            // Close the modal and reset the form
            addTaskModalDialog.close();
            addTaskForm.reset();

            // Reload the page. This ensures that script.js (which handles the main task rendering and interactions)
            // will pick up the new task from local storage and render it correctly, including attaching its
            // event listeners for opening the view/edit modal. This is the most reliable way to ensure
            // the new task behaves identically to existing tasks without modifying script.js.
            location.reload();
        });
    }
});