var express        = require('express'),
    departmentController = require('../controllers/department'),
    passport       = require('passport'),
    router         = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), departmentController.save);

router.get('/', departmentController.list);

router.get('/search/:search', departmentController.search);

router.get('/:id', departmentController.show);

router.put('/:id', passport.authenticate('jwt', { session: false }), departmentController.edit);

router.delete('/:id', passport.authenticate('jwt', { session: false }), departmentController.delete);

router.post('/:id/information/create', passport.authenticate('jwt', { session: false }), departmentController.insertInformation);

router.put('/:idsetor/information/:idinfo', passport.authenticate('jwt', { session: false }), departmentController.editInformation);

router.get('/:idsetor/information', departmentController.listInformations);

router.get('/:idsetor/information/:idinfo', departmentController.viewInformation);

router.delete('/:idsetor/information/:idinfo', passport.authenticate('jwt', { session: false }), departmentController.removeInformation);

module.exports = router;




