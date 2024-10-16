function openPopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    popup.style.display = "block"; // Show the popup
    overlay.style.display = "block"; // Show the overlay

    setTimeout(() => {
        popup.classList.add("show"); // Add the show class to trigger the transition
    }, 10);
}

// Đóng popup
function closePopup() {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");

    popup.classList.remove("show");

    setTimeout(() => {
        popup.style.display = "none";
        overlay.style.display = "none";
    }, 300);
}
// Hàm hiển thị tên file khi người dùng upload ảnh hoặc video
document.getElementById('uploadImage').addEventListener('change', function () {
    let imageFile = this.files[0]; // Lấy file ảnh
    if (imageFile) {
        document.getElementById('imageFileName').textContent = `Selected Image: ${imageFile.name}`; // Hiển thị tên file ảnh
    }
});

document.getElementById('uploadVideo').addEventListener('change', function () {
    let videoFile = this.files[0]; // Lấy file video
    if (videoFile) {
        document.getElementById('videoFileName').textContent = `Selected Video: ${videoFile.name}`; // Hiển thị tên file video
    }
});

// Hàm để lưu trữ nội dung và ảnh vào Local Storage
function saveContent() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    let imageFile = document.getElementById("uploadImage").files[0]; // Lấy file ảnh nếu có

    if (title && content) {
        let contents = JSON.parse(localStorage.getItem("contents") || "[]");
        let contentData = {
            title: title,
            content: content,
            saveTime: new Date().toISOString() // Lưu thời gian hiện tại khi tạo bài viết
        };

        // Nếu có ảnh, lưu ảnh dưới dạng Base64
        if (imageFile) {
            let reader = new FileReader();
            reader.onload = function(e) {
                contentData.image = e.target.result; // Lưu Base64 của ảnh
                contents.push(contentData);
                localStorage.setItem("contents", JSON.stringify(contents)); // Lưu vào Local Storage
                closePopup();
                window.location.href = "index.html"; // Tải lại trang sau khi lưu
            };
            reader.readAsDataURL(imageFile);
        } else {
            contents.push(contentData);
            localStorage.setItem("contents", JSON.stringify(contents)); // Lưu vào Local Storage
            closePopup();
            window.location.href = "index.html"; // Tải lại trang sau khi lưu
        }
    } else {
        alert("Please fill in all fields");
    }
}

// Hàm để hủy popup với alert
function cancelPopup() {
    const confirmation = confirm("You have not saved yet. If you agree to cancel, your post will not be saved.");
    if (confirmation) {
        // Xóa dữ liệu đã nhập
        document.getElementById("title").value = ""; 
        document.getElementById("content").value = ""; 
        document.getElementById("uploadImage").value = ""; 
        document.getElementById('imageFileName').textContent = ""; 

        closePopup();
    }
}


// Đóng popup khi click chuột ngoài popup (overlay)
document.getElementById("overlay").addEventListener("click", function() {
    cancelPopup(); // Gọi hàm hủy popup
});

// Nút Cancel trong popup
document.querySelector(".cancel-btn").addEventListener("click", function() {
    cancelPopup(); // Gọi hàm hủy popup khi nhấn Cancel
});
