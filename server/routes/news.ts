var express        = require('express'),
    newsController = require('../controllers/news'),
    passport       = require('passport'),
    router         = express.Router();

router.get('/scrape', newsController.save);

router.get('/', newsController.list);

router.get('/list', newsController.listBot);

router.delete('/:id', passport.authenticate('jwt', { session: false }), newsController.delete);

module.exports = router;