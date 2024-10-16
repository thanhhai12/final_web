// Function to navigate to the Add Content page
function goToCMS() {
    window.location.href = 'add.html'; // Navigate to Add Content page
}

function goToProfile() {
    window.location.href = 'profile.html'; // Redirects to profile.html
}


// Function to navigate to Settings page
function goToSettings() {
    alert('Settings page not implemented yet.');
}

// Function to navigate to Support page
function goToSupport() {
    window.location.href = 'contact.html'; // Redirects to profile.html
}

function goToPost() {
    window.location.href = 'post.html'; // Điều hướng sang post.html
}

function goToMedia() {
    window.location.href = 'media.html';
}


function goToDocument() {
    window.location.href = 'document.html';
}
function goToShared() {
    window.location.href = 'shared.html';
}
// Function to display content from localStorage on Home page
function displayContent() {
    const contentList = document.getElementById('content-list');
    const existingContents = JSON.parse(localStorage.getItem('cmsContents')) || [];

    contentList.innerHTML = ''; // Clear existing content before adding new items

    existingContents.forEach((content, index) => {
        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';
        contentItem.innerHTML = `<h3>${content.title}</h3><p>${content.content}</p>`;

        if (content.image) {
            const imageElement = document.createElement('img');
            imageElement.src = content.image;
            imageElement.alt = 'Uploaded Image';
            imageElement.style.maxWidth = '200px';
            contentItem.appendChild(imageElement);
        }

        if (content.doc) {
            const docLink = document.createElement('a');
            docLink.href = content.doc;
            docLink.textContent = 'Download DOCX';
            docLink.target = '_blank';
            contentItem.appendChild(docLink);
        }

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn delete-btn';
        deleteButton.onclick = () => deleteContent(index); // Call deleteContent function with index
        contentItem.appendChild(deleteButton);

        contentList.appendChild(contentItem);
    });
}

// Function to delete content from localStorage
function deleteContent(index) {
    const existingContents = JSON.parse(localStorage.getItem('cmsContents')) || [];
    existingContents.splice(index, 1); // Remove the content at the specified index
    localStorage.setItem('cmsContents', JSON.stringify(existingContents)); // Update localStorage

    displayContent(); // Refresh the content list
}

// Load existing content on page load
document.addEventListener('DOMContentLoaded', displayContent);


function toggleNav() {
    var nav = document.getElementById("side-nav");
    if (nav.style.width === "250px") {
        nav.style.width = "0";
    } else {
        nav.style.width = "250px";
    }
}

function closeNav() {
    document.getElementById("side-nav").style.width = "0";
}


function goToSupport() {
    window.location.href = 'contact.html'; // Redirect to contact.html
}



