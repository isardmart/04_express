const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/category');

router.post('/add',controller.add)
router.post('/update',controller.update)
router.post('/delete',controller.delete)

router.get('/categories',controller.categories) 

router.get ('/products',controller.all)

router.get('/:category',controller.category)

module.exports = router;