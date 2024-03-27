const express = require('express');
// Router
var router = express.Router();

// Common Response
const { response } = require('../config/response');

// Import Controllers
const excelController = require('../controllers/excelController');

const { upload } = require('../config/auth');

router.get('/', (req, res) => {
    try {
        return response(res, req.body, 'Welcome API', 200);
    } catch (error) {
        return response(res, req.body, error.message, 500);
    }
});

// router.post('/upload', upload.single('excel'), excelController.uploadExcel);
router.post('/upload', upload.single('excel'), excelController.uploadExcel);



module.exports = router;