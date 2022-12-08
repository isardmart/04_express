const express     = require('express'), 
    router        = express.Router(),
    controller    = require('../controllers/product');

router.get('/',controller.get_all)

router.post('/add',controller.add)

router.post('/delete',controller.delete)

router.post('/update',controller.update)

router.get ('/:product',controller.product)


module.exports = router;