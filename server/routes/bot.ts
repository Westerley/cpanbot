var express        = require('express'),
    botController = require('../controllers/bot'),
    router         = express.Router();

router.get('/', botController.webhook);

router.post('/', botController.subscriptionWebhook);

module.exports = router;