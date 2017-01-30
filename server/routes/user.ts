var express        = require('express'),
    userController = require('../controllers/user'),
    passport       = require('passport'),
    router         = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), userController.save);

router.get('/', passport.authenticate('jwt', { session: false }), userController.list);

router.get('/:id', passport.authenticate('jwt', { session: false }), userController.show);

router.put('/:id', passport.authenticate('jwt', { session: false }), userController.edit);

router.put('/pass/:id', passport.authenticate('jwt', { session: false }), userController.editPassword);

router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.delete);

router.post('/login', userController.login);

module.exports = router;




