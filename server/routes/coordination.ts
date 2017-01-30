var express        = require('express'),
    coordinationControler = require('../controllers/coordination'),
    passport       = require('passport'),
    router         = express.Router();

router.post('/create', passport.authenticate('jwt', { session: false }), coordinationControler.save);

router.get('/', coordinationControler.list);

router.get('/search/:search', coordinationControler.search);

router.get('/:id', coordinationControler.show);

router.put('/:id', passport.authenticate('jwt', { session: false }), coordinationControler.edit);

router.delete('/:id', passport.authenticate('jwt', { session: false }), coordinationControler.delete);

module.exports = router;




