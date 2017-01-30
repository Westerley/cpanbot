var express        = require('express'),
    phoneController = require('../controllers/phone'),
    passport       = require('passport'),
    router         = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), phoneController.save);

router.get('/', phoneController.list);

router.get('/search/:search', phoneController.search);

router.get('/:id', phoneController.show);

router.put('/:id', passport.authenticate('jwt', { session: false }), phoneController.edit);

router.delete('/:id', passport.authenticate('jwt', { session: false }), phoneController.delete);

module.exports = router;




