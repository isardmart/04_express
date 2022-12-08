const { application } = require('express');

const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/category');

router.post('/get_all',controller.get_all) 

module.exports = router;