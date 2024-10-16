// Function for the Save button
document.querySelector('.save-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    alert('Save successfully');
    window.location.href = 'index.html'; // Redirect to home.html after the notification
});

// Function for the Cancel button
document.querySelector('.cancel-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent any default form submission
    let confirmCancel = confirm('Do you want to cancel without changing anything?');

    if (confirmCancel) {
        window.location.href = 'index.html'; // If user confirms, redirect to home.html
    } else {
        // If user presses "No", do nothing and remain on the current page
    }
});


// Function for the Help button
function goToContact() {
    window.location.href = 'contact.html'; // Redirect to contact.html
}
