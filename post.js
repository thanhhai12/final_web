// Lấy dữ liệu từ Local Storage và hiển thị danh sách content
function displayContentList() {
    let contents = JSON.parse(localStorage.getItem("contents") || []);
    const contentList = document.getElementById("contentList");

    // Xóa danh sách cũ trước khi hiển thị nội dung mới
    contentList.innerHTML = '';

    // Sắp xếp các bài viết theo thời gian lưu (mới nhất -> cũ nhất)
    let sortedContents = [...contents]; // Tạo một bản sao của mảng contents để sắp xếp
    sortedContents.sort((a, b) => new Date(b.saveTime) - new Date(a.saveTime));

    // Hiển thị từng content trong danh sách
    sortedContents.forEach((content, displayIndex) => {
        // Lưu index gốc vào thuộc tính data-index
        const originalIndex = contents.findIndex(c => c.saveTime === content.saveTime);

        const contentItem = document.createElement('div');
        contentItem.className = 'content-item';
        contentItem.setAttribute('data-index', originalIndex); // Gán index gốc

        const contentTitle = document.createElement('div');
        contentTitle.className = 'content-title';
        const saveTime = new Date(content.saveTime);
        const formattedTime = saveTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedDate = saveTime.toLocaleDateString();
        contentTitle.innerHTML = `<strong>${content.title.toUpperCase()} - ${formattedTime} ${formattedDate}</strong>`;

        const toolbar = document.createElement('div');
        toolbar.className = 'toolbar';
        toolbar.innerHTML = `
        <div class="dropdown">
          <button class="dropbtn">⋮</button>
          <div class="dropdown-content">
            <a href="#" onclick="editContent(${originalIndex})">Edit</a>
            <a href="#" onclick="deleteContent(${originalIndex})">Delete</a>
          </div>
        </div>`;

        const contentBody = document.createElement('div');
        contentBody.className = 'content-body';
        contentBody.innerText = content.content;

        if (content.image) {
            const imageElement = document.createElement('img');
            imageElement.src = content.image;
            imageElement.alt = 'Uploaded Image';
            imageElement.style.maxWidth = '100%';
            imageElement.style.borderRadius = '10px';
            imageElement.style.marginTop = '10px';
            contentBody.appendChild(imageElement);
        }

        contentItem.appendChild(contentTitle);
        contentItem.appendChild(toolbar);
        contentItem.appendChild(contentBody);
        contentList.appendChild(contentItem);
    });
}

let scrollPosition = 0; // Biến để lưu vị trí cuộn của trang

// Hàm để mở popup chỉnh sửa
function editContent(originalIndex) {
    let contents = JSON.parse(localStorage.getItem("contents") || []);
    let content = contents[originalIndex]; // Lấy bài viết theo index gốc từ Local Storage

    if (content) {
        // Lưu vị trí cuộn hiện tại
        scrollPosition = window.pageYOffset;

        // Đặt lại nội dung cho popup chỉnh sửa
        document.getElementById("title").value = content.title;
        document.getElementById("content").value = content.content;
        
        // Hiển thị popup và overlay
        document.getElementById("popup").classList.add('show');
        document.getElementById("overlay").classList.add('show');

        // Thay thế sự kiện click cho nút Save để lưu thay đổi
        document.querySelector(".save-btn").onclick = function () {
            content.title = document.getElementById("title").value;
            content.content = document.getElementById("content").value;
            content.saveTime = new Date().toISOString(); // Cập nhật thời gian lưu
            contents[originalIndex] = content; // Cập nhật nội dung đã chỉnh sửa
            localStorage.setItem("contents", JSON.stringify(contents)); // Lưu vào Local Storage
            closePopup(); // Đóng popup sau khi lưu
            displayContentList(); // Hiển thị lại danh sách nội dung
        };
    }
}

// Hàm để đóng popup và khôi phục cuộn
function closePopup() {
    document.getElementById("popup").classList.remove('show');
    document.getElementById("overlay").classList.remove('show');

    // Khôi phục lại cuộn trang khi đóng popup
    document.body.classList.remove('fixed-position');
    window.scrollTo(0, scrollPosition); // Đưa trang trở lại vị trí cũ
}


// Hàm để xóa content hoàn toàn khỏi Local Storage với xác nhận trước khi xóa
function deleteContent(index) {
    // Hiển thị hộp thoại xác nhận
    const confirmation = confirm("Are you sure to delete this post?");
    
    // Nếu người dùng xác nhận OK thì xóa bài viết
    if (confirmation) {
        let contents = JSON.parse(localStorage.getItem("contents") || []);

        // Xóa nội dung tại vị trí index
        contents.splice(index, 1);
        
        // Lưu lại nội dung sau khi đã xóa vào Local Storage
        localStorage.setItem("contents", JSON.stringify(contents));

        // Cập nhật lại danh sách sau khi xóa
        displayContentList();
        
        // Thông báo sau khi xóa thành công
        alert('Content has been deleted.');
    }
    // Nếu người dùng nhấn Cancel, không thực hiện gì thêm
}

// Hàm tìm kiếm content dựa trên tiêu đề và nội dung, và bôi xanh từ khóa tìm kiếm
function searchContent() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const contentItems = document.querySelectorAll('.content-item');

    contentItems.forEach(item => {
        const titleElement = item.querySelector('.content-title');
        const bodyElement = item.querySelector('.content-body');
        const images = bodyElement.querySelectorAll('img'); // Giữ lại tất cả hình ảnh trong body

        const originalTitle = titleElement.textContent; // Lưu trữ nội dung tiêu đề gốc
        const originalBody = bodyElement.textContent; // Lưu trữ nội dung văn bản gốc (không bao gồm hình ảnh)

        const title = originalTitle.toLowerCase();
        const body = originalBody.toLowerCase();

        // Kiểm tra xem tiêu đề hoặc nội dung có chứa searchTerm ở bất kỳ vị trí nào
        if (title.includes(searchTerm) || body.includes(searchTerm)) {
            item.style.display = 'block'; // Hiển thị những nội dung khớp với tìm kiếm

            // Bôi xanh từ khóa trong tiêu đề (chỉ thay thế văn bản)
            const highlightedTitle = originalTitle.replace(new RegExp(searchTerm, 'gi'), (match) => {
                return `<mark>${match}</mark>`;
            });
            titleElement.innerHTML = highlightedTitle;

            // Bôi xanh từ khóa trong nội dung (chỉ thay thế văn bản)
            const highlightedBody = originalBody.replace(new RegExp(searchTerm, 'gi'), (match) => {
                return `<mark>${match}</mark>`;
            });
            bodyElement.innerHTML = highlightedBody;

            // Thêm lại hình ảnh vào body sau khi thay thế văn bản
            images.forEach(img => {
                bodyElement.appendChild(img); // Thêm lại các hình ảnh sau phần văn bản
            });

        } else {
            item.style.display = 'none'; // Ẩn những nội dung không khớp
        }
    });
}

// Gọi hàm hiển thị danh sách khi trang được load
document.addEventListener('DOMContentLoaded', displayContentList);
