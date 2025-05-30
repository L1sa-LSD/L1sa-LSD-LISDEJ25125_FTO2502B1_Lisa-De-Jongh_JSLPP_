// script.js
import { initialTasks } from './initialData.js';

const TASKS_STORAGE_KEY = 'kanbanTasks';
let tasks = [];
let currentEditingTaskId = null;

// DOM Elements
// Column Task Containers
const todoTasksContainer = document.querySelector('.column-div[data-status="todo"] .tasks-container');
const doingTasksContainer = document.querySelector('.column-div[data-status="doing"] .tasks-container');
const doneTasksContainer = document.querySelector('.column-div[data-status="done"] .tasks-container');

// Column Header Texts for Count Update
const todoHeaderCount = document.getElementById('toDoText');
const doingHeaderCount = document.getElementById('doingText');
const doneHeaderCount = document.getElementById('doneText');

// Task Modal (for viewing/editing)
const taskModal = document.getElementById('task-modal');
const taskModalForm = document.getElementById('task-form'); // Get the form element
const modalCloseButton = taskModal.querySelector('#close-modal-btn');
const modalTaskTitleInput = taskModal.querySelector('#task-title');
const modalTaskDescriptionInput = taskModal.querySelector('#task-desc');
const modalTaskStatusSelect = taskModal.querySelector('#task-status');
const saveTaskButton = taskModal.querySelector('#save-btn');
const deleteTaskButton = taskModal.querySelector('#deletion-btn');


// --- Data Persistence Functions ---

/**
 * Loads tasks from local storage or initializes with initialTasks if none are found.
 * @returns {void}
 */
function loadTasks() {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    } else {
        // Deep copy initialTasks to avoid modifying the imported constant
        tasks = initialTasks.map(task => ({ ...task }));
        saveTasksToLocalStorage(); // Save initial tasks if localStorage was empty
    }
    renderAllTasks();
}

/**
 * Saves the current state of tasks to local storage.
 * @returns {void}
 */
function saveTasksToLocalStorage() {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Retrieves a task by its ID.
 * @param {number|string} id - The ID of the task to retrieve.
 * @returns {object|undefined} The task object if found, otherwise undefined.
 */
function getTaskById(id) {
    // Ensure comparison is type-safe if IDs might be numbers or strings
    return tasks.find(task => String(task.id) === String(id));
}

// --- Rendering Functions ---

/**
 * Creates an HTML element for a single task.
 * @param {object} task - The task object.
 * @param {number} task.id - The unique ID of the task.
 * @param {string} task.title - The title of the task.
 * @param {string} task.description - The description of the task (not directly shown on card, but used for modal).
 * @returns {HTMLElement} The created task element (a div with class 'task-div').
 */
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-div');
    taskElement.dataset.taskId = task.id; // Store task ID for easy access
    taskElement.textContent = task.title; // Display task title

    // Add click listener to open the modal for this task
    taskElement.addEventListener('click', () => openTaskModal(task.id));
    return taskElement;
}

/**
 * Renders all tasks into their respective columns on the UI and updates column counts.
 * @returns {void}
 */
function renderAllTasks() {
    // Clear existing tasks from columns
    todoTasksContainer.innerHTML = '';
    doingTasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';

    let todoCount = 0;
    let doingCount = 0;
    let doneCount = 0;

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        if (task.status === 'todo') {
            todoTasksContainer.appendChild(taskElement);
            todoCount++;
        } else if (task.status === 'doing') {
            doingTasksContainer.appendChild(taskElement);
            doingCount++;
        } else if (task.status === 'done') {
            doneTasksContainer.appendChild(taskElement);
            doneCount++;
        }
    });

    // Update column header counts
    if (todoHeaderCount) todoHeaderCount.textContent = `TODO (${todoCount})`;
    if (doingHeaderCount) doingHeaderCount.textContent = `DOING (${doingCount})`;
    if (doneHeaderCount) doneHeaderCount.textContent = `DONE (${doneCount})`;
}

// --- Modal Functions ---

/**
 * Opens the task modal and populates it with details of the specified task.
 * @param {number|string} taskId - The ID of the task to display/edit.
 * @returns {void}
 */
function openTaskModal(taskId) {
    const numericTaskId = parseInt(taskId, 10); // Ensure taskId is a number for 'find'
    currentEditingTaskId = numericTaskId;
    const task = getTaskById(numericTaskId);

    if (!task) {
        console.error("Task not found for ID:", numericTaskId);
        return;
    }

    modalTaskTitleInput.value = task.title;
    modalTaskDescriptionInput.value = task.description;
    modalTaskStatusSelect.value = task.status;
    taskModal.showModal(); // Use showModal() for <dialog> elements
}

/**
 * Closes the task modal.
 * @returns {void}
 */
function closeTaskModal() {
    taskModal.close(); // Use close() for <dialog> elements
    currentEditingTaskId = null;
}

/**
 * Handles the saving of task details from the modal.
 * Updates the task in the `tasks` array, saves to local storage,
 * re-renders tasks, and closes the modal.
 * @returns {void}
 */
function handleSaveTask() {
    if (currentEditingTaskId === null) return;

    const taskIndex = tasks.findIndex(t => t.id === currentEditingTaskId);
    if (taskIndex === -1) {
        console.error("Task to save not found:", currentEditingTaskId);
        return;
    }

    tasks[taskIndex].title = modalTaskTitleInput.value.trim();
    tasks[taskIndex].description = modalTaskDescriptionInput.value.trim();
    tasks[taskIndex].status = modalTaskStatusSelect.value;

    saveTasksToLocalStorage();
    renderAllTasks();
    closeTaskModal();
}

/**
 * Handles the deletion of the currently editing task.
 * Prompts the user for confirmation before deleting.
 * @returns {void}
 */
function handleDeleteTask() {
    if (currentEditingTaskId === null) return;

    // Display a confirmation dialog
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(task => task.id !== currentEditingTaskId);
        saveTasksToLocalStorage();
        renderAllTasks();
        closeTaskModal(); // Close the main task modal
    }
    // If 'Cancel' is clicked, do nothing, modal remains open or user can close it.
}


// --- Event Listeners ---

// Event listener for the task modal form submission (if buttons remain type="submit")
// This handles if either "Save" or "Delete" (both type="submit") trigger a form submit
if (taskModalForm) {
    taskModalForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default dialog closing or page reload

        // Determine which button was clicked if needed, though direct listeners are often clearer
        // For now, we rely on direct button click listeners below
    });
}


// Direct click listener for the "Save Task" button
if (saveTaskButton) {
    saveTaskButton.addEventListener('click', (event) => {
        event.preventDefault(); // Good practice if it's inside a form
        handleSaveTask();
    });
}

// Direct click listener for the "Delete Task" button
if (deleteTaskButton) {
    deleteTaskButton.addEventListener('click', (event) => {
        event.preventDefault(); // Good practice if it's inside a form
        handleDeleteTask();
    });
}

// Event listener for the modal's close button
if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeTaskModal);
}

// Optional: Close modal if user clicks on the backdrop (for <dialog>)
if (taskModal) {
    taskModal.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            closeTaskModal();
        }
    });
}

// --- Initialization ---
/**
 * Initializes the application by loading tasks when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    // Other initializations if needed
});