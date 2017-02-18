var express        = require('express'),
    homeController = require('../controllers/home'),
    passport       = require('passport'),
    router         = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), homeController.save);

router.get('/', homeController.list);

router.get('/search/:id', homeController.search);

router.get('/:id', homeController.show);

router.put('/:id', passport.authenticate('jwt', { session: false }), homeController.edit);

module.exports = router;




