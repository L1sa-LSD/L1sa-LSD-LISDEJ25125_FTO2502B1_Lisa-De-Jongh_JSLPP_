/**
 * @fileoverview This script handles the functionality of the "Add New Task" modal.
 */

/**
 * @function openModal
 * @description Opens the "Add New Task" modal by calling the showModal() method.
 */
function openModal() {
  const modal = document.getElementById('add-task-modal');
  if (modal && typeof modal.showModal === 'function') {
    modal.showModal();
  }
}

/**
 * @function closeModal
 * @description Closes the "Add New Task" modal and resets the form.
 */
function closeModal() {
  const modal = document.getElementById('add-task-modal');
  const form = document.getElementById('add-task-form');
  
  if (modal && typeof modal.close === 'function') {
    modal.close();
  }
  
  // Reset the form when closing
  if (form) {
    form.reset();
  }
}
/**
 * @function handleFormSubmit
 * @description Handles the form submission when creating a new task.
 * @param {Event} event - The form submit event
 */
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form data
  const formData = new FormData(event.target);
  const taskData = {
    title: formData.get('title'),
    description: formData.get('description'),
    status: formData.get('status')
  };
  
  // Log the task data (you can replace this with your actual task creation logic)
  console.log('New task created:', taskData);
  
  // Close the modal after successful submission
  closeModal();
}

/**
 * @function setupModalEventListeners
 * @description Sets up all event listeners for the modal functionality.
 */
function setupModalEventListeners() {
  // Find the button that opens the modal (looking for button with "+ Add New Task" text)
  const addTaskButtons = document.querySelectorAll('button');
  let openModalButton = null;
  
  // Search through buttons to find the one with "Add New Task" text
  for (let i = 0; i < addTaskButtons.length; i++) {
    if (addTaskButtons[i].textContent.includes('Add New Task') || 
        addTaskButtons[i].textContent.includes('+ Add New Task')) {
      openModalButton = addTaskButtons[i];
      break;
    }
  }
  
  // Get the close button inside the modal
  const closeModalButton = document.getElementById('close-modal-btn');
  
  // Get the form
  const taskForm = document.getElementById('add-task-form');
  
  // Get the modal element for backdrop clicks
  const modal = document.getElementById('add-task-modal');
  
  // Add event listener to open modal button
  if (openModalButton) {
    openModalButton.addEventListener('click', openModal);
  }
  
  // Add event listener to close button
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }
  
  // Add event listener to form submission
  if (taskForm) {
    taskForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Close modal when clicking on backdrop
  if (modal) {
    modal.addEventListener('click', function(event) {
      // Only close if clicking on the modal backdrop (not the content)
      if (event.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal when pressing Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      const modal = document.getElementById('add-task-modal');
      if (modal && modal.open) {
        closeModal();
      }
    }
  });
}

/**
 * @function initializeModal
 * @description Initializes the modal functionality when the DOM is ready.
 */
function initializeModal() {
  setupModalEventListeners();
  console.log('Modal functionality initialized');
}

// Initialize the modal when the DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeModal);

