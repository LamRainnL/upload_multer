const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Định nghĩa nơi lưu trữ tệp tin tải lên
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Khởi tạo middleware multer
const upload = multer({ storage: storage });

// Route GET để hiển thị giao diện
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route POST để xử lý tệp tin tải lên
app.post('/upload', upload.array('files'), (req, res) => {
  // Xử lý tệp tin tải lên ở đây
  res.send('Tệp tin đã được tải lên thành công!');
});

// Khởi động máy chủ
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
