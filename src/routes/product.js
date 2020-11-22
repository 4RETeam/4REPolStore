const express = require('express');
const { adminMiddleware, requireSignin } = require('../common-middleware');
const { createProduct } = require('../controller/product');
// const {  } = require('../controller/category');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/product/create', requireSignin, adminMiddleware, upload.single('productPictures'), createProduct);

// router.get('/category/getcategory', getCategories);

module.exports = router;