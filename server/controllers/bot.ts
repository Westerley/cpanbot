var express    = require('express'),
    config     = require('../config/config'),
    msg_bot    = require('../config/message'),
    request    = require('request'),
    natural    = require('natural'),
    bodyParser = require('body-parser'),
    classifier = new natural.BayesClassifier(),
    app        = express();

import { createHmac } from 'crypto';

app.use(bodyParser.json({ verify: verifyRequestSignature }));

function verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature"];

    if (!signature) {
        console.error("Couldn't validate the signature.");
    } else {
        var elements = signature.split('=');
        var method = elements[0];
        var signatureHash = elements[1];

        var expectedHash = createHmac('sha1', config.appSecret)
            .update(buf)
            .digest('hex');

        if (signatureHash != expectedHash) {
            throw new Error("Couldn't validate the request signature.");
        }
    }
}

function removeAccent(str) {
    var character = /\^|~|\?|,|\*|\.|\-/g;
    str = str.replace(character, "");
    var accent = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
    var not_accent = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    var word = '';
    for(var i = 0; i < str.length; i++) {
        if (accent.search(str.substr(i, 1)) >= 0) {
            word += not_accent.substr(accent.search(str.substr(i, 1)), 1);
        }
        else {
            word += str.substr(i, 1);
        }
    }
    return word.toLowerCase();
}

function trainData() {
    classifier.addDocument('noticias', 'notic');
    classifier.addDocument('novidades', 'notic');
    classifier.addDocument('informacoes', 'inform');
    classifier.addDocument('informacao', 'inform');
    classifier.addDocument('setor', 'department');
    classifier.addDocument('departamento', 'department');
    classifier.addDocument('telefone', 'telefon');
    classifier.addDocument('tel cel', 'telefon');
    classifier.addDocument('curso', 'cours');
    classifier.addDocument('bacharelado', 'bacharelado');
    classifier.addDocument('licenciatura', 'licenciatura');
    classifier.addDocument('pos-graduacao pos graduacao', 'pos');
    classifier.addDocument('nao tchau bye',  'no');
    classifier.addDocument('oi', 'initial');
    classifier.addDocument('ola', 'initial');
    classifier.addDocument('bom dia', 'initial');
    classifier.addDocument('boa tarde', 'initial');
    classifier.addDocument('boa noite', 'initial');
    classifier.addDocument('forma de ingresso', 'ingresso');
    classifier.train();
    classifier.save('classifier.json', function(err, classifier) { } );
}

exports.webhook = function (req, res, next) {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === config.validationToken) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
};

exports.subscriptionWebhook = function (req, res, next) {
    var data = req.body;

    if (data.object === 'page') {

        data.entry.forEach(function(entry) {
            var pageID = entry.id;
            var timeOfEvent = entry.time;

            entry.messaging.forEach(function(event) {
                if (event.optin) {
                    receivedAuthentication(event);
                } else if (event.message) {
                    receivedMessage(event);
                } else if (event.delivery) {
                    receivedDeliveryConfirmation(event);
                } else if (event.postback) {
                    receivedPostback(event);
                } else if (event.read) {
                    receivedMessageRead(event);
                } else if (event.account_linking) {
                    receivedAccountLink(event);
                } else {
                    console.log("Webhook received unknown messagingEvent: ", event);
                }
            });

        });

        res.sendStatus(200);
    }
};

function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;
    var quickReply = message.quick_reply;

    if (quickReply) {
        var quickPayload = quickReply.payload;

        quickPayload = quickPayload.split("|");

        if (quickPayload[0] == "Phone") {
            sendPhoneResponseMessage(senderID, quickPayload[1]);
        } else if (quickPayload[0] == "Department") {
            sendDepartmentResponseMessage(senderID, quickPayload[1]);
        } else if (quickPayload[0] == "Course") {
            if (quickPayload[1] == "INGRESSO") {
                sendHomeMessage(senderID);
            } else {
                sendCourseResponseMessage(senderID, quickPayload[1]);
            }
        }

        return;
    }

    if (messageText) {

        natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {

            messageText = classifier.getClassifications(removeAccent(messageText));

            var result = false;
            var value = messageText[0].value;
            if (value >= 0.3) {
                result = true;
            }

            if (result) {
                messageText = 'other';
            } else {
                messageText = messageText[0].label;
            }

            switch (messageText) {
                case 'notic':
                    sendNewsMessage(senderID);
                    break;
                case 'inform':
                    sendInfoMessage(senderID, msg_bot.message_information_question);
                    break;
                case 'telefon':
                    sendPhoneMessage(senderID);
                    break;
                case 'department':
                    sendDepartmentMessage(senderID);
                    break;
                case 'no':
                    sendTextMessage(senderID, msg_bot.message_end);
                    break;
                case 'initial':
                    sendMessage(senderID, msg_bot.message_welcome);
                    break;
                case 'cours':
                    sendCourseMessage(senderID);
                    break;
                case 'bacharelado':
                    sendCourseResponseMessage(senderID, 'BACHARELADO');
                    break;
                case 'licenciatura':
                    sendCourseResponseMessage(senderID, 'LICENCIATURA');
                    break;
                case 'pos':
                    sendCourseResponseMessage(senderID, 'PÓSGRADUAÇÃO');
                    break;
                case 'ingresso':
                    sendHomeMessage(senderID);
                    break;
                default:
                    sendMessage(senderID, msg_bot.message_not_understand);
            }

        });
    } else if (messageAttachments) {
        sendTextMessage(senderID, ":)");
    }
}

function receivedAccountLink(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;

    var status = event.account_linking.status;
    var authCode = event.account_linking.authorization_code;

    console.log("Received account link event with for user %d with status %s " +
        "and auth code %s ", senderID, status, authCode);
}

function receivedAuthentication(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfAuth = event.timestamp;

    var passThroughParam = event.optin.ref;

    console.log("Received authentication for user %d and page %d with pass " +
        "through param '%s' at %d", senderID, recipientID, passThroughParam,
        timeOfAuth);

    sendTextMessage(senderID, "Authentication successful");
}

function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    var payload = event.postback.payload;
    payload = payload.split("|");

    if (payload[0] == "NEWS") {
        sendNewsMessage(senderID);
    } else if (payload[0] == "INFO") {
        sendInfoMessage(senderID, msg_bot.message_information_question);
    } else if (payload[0] == "PHONE") {
        sendPhoneMessage(senderID);
    } else if (payload[0] == "DEPARTMENT") {
        sendDepartmentMessage(senderID)
    } else if (payload[0] == 'DOUBT') {
        sendDepartmentDoubtResponseMessage(senderID, payload[1]);
    } else if (payload[0] == 'COURSES') {
        sendCourseMessage(senderID);
    } else if (payload[0] == 'INITIAL') {
        sendMessage(senderID,  msg_bot.message_selection);
    } else if (payload[0] == "STARTED_BUTTON_PAYLOAD") {
        sendTextMessage(senderID, msg_bot.message_first_interaction);
        setTimeout(function () {
            sendMessage(senderID, msg_bot.message_selection);
        }, 1500);

    } else {
        sendTextMessage(senderID, "");
    }
}

function receivedDeliveryConfirmation(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var delivery = event.delivery;
    var messageIDs = delivery.mids;
    var watermark = delivery.watermark;
    var sequenceNumber = delivery.seq;

    if (messageIDs) {
        messageIDs.forEach(function(messageID) {
            console.log("Received delivery confirmation for message ID: %s",
                messageID);
        });
    }

    console.log("All message before %d were delivered.", watermark);
}

function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText
        }
    };

    callSendAPI(messageData);
}

function callSendAPI(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: config.pageAccessToken },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });
}

function receivedMessageRead(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;

    // All messages before watermark (a timestamp) or sequence have been seen.
    var watermark = event.read.watermark;
    var sequenceNumber = event.read.seq;

    console.log("Received message read event for watermark %d and sequence " +
        "number %d", watermark, sequenceNumber);
}

function sendMessage(recipientId, text) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: text,
                    buttons:[{
                        type: "postback",
                        title: "Notícias",
                        payload: "NEWS|"
                    }, {
                        type: "postback",
                        title: "Informações",
                        payload: "INFO|"
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}

function sendNewsMessage(recipientId) {

    var dados;

    request("https://cpanbot.herokuapp.com/api/news/list",  function(error, response, data) {
        if (response.statusCode == 200) {

            dados = JSON.parse(data);

            var messageData = {
                recipient: {
                    id: recipientId
                },
                message: {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "generic",
                            elements: [{
                                title: dados[0].title,
                                item_url: dados[0].link,
                                image_url: dados[0].linkImage,
                                buttons: [{
                                    type: "web_url",
                                    url: dados[0].link,
                                    title: "Acessar o Site"
                                }],
                            }, {
                                title: dados[1].title,
                                item_url: "",
                                image_url: dados[1].linkImage,
                                buttons: [{
                                    type: "web_url",
                                    url: dados[1].link,
                                    title: "Acessar o Site"
                                }],
                            }, {
                                title: dados[2].title,
                                item_url: dados[2].link,
                                image_url: dados[2].linkImage,
                                buttons: [{
                                    type: "web_url",
                                    url: dados[2].link,
                                    title: "Acessar o Site"
                                }],
                            }]
                        }
                    }
                }
            };

            sendTextMessage(recipientId, msg_bot.message_news);
            setTimeout(function () {
                callSendAPI(messageData);
            }, 1500);

        } else {
            sendTextMessage(recipientId, msg_bot.message_error_news);
        }

    });

    setTimeout(function () {
        sendMessage(recipientId, msg_bot.message_initial_question);
    }, 2500);

}

function sendInfoMessage(recipientId, text) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: text,
                    buttons:[{
                        type: "postback",
                        title: "Telefones",
                        payload: "PHONE|"
                    }, {
                        type: "postback",
                        title: "Setores",
                        payload: "DEPARTMENT|"
                    }, {
                        type: "postback",
                        title: "Cursos",
                        payload: "COURSES|"
                    }]
                }
            }
        }
    };

    callSendAPI(messageData);
}

function sendPhoneMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: msg_bot.message_phone_question,
            quick_replies: [
                {
                    "content_type":"text",
                    "title":"Secretaria",
                    "payload":"Phone|SECRETARIA"
                },
                {
                    "content_type":"text",
                    "title":"Coordenações",
                    "payload":"Phone|COORDENAÇÃO"
                },
                {
                    "content_type":"text",
                    "title":"Setores",
                    "payload":"Phone|SETOR"
                }
            ]
        }
    };

    callSendAPI(messageData);
}

function sendPhoneResponseMessage(recipientId, name) {

    var dados;

    request.get("https://cpanbot.herokuapp.com/api/phone/search/" + name,  function(error, response, data) {
        if (response.statusCode == 200) {

            dados = JSON.parse(data);
            var message = "";
            for (var i = 0; i < dados.length; i++){
                message += dados[i].name + ": " + dados[i].telephone + "\n";
            }
            sendTextMessage(recipientId, message);

        } else {
            sendTextMessage(recipientId, msg_bot.message_error_phone);
        }

    });

    setTimeout(function () {
        sendInfoMessage(recipientId, msg_bot.message_initial_question);
    }, 1500);

}

function sendDepartmentMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: msg_bot.message_department_question,
            quick_replies: [
                {
                    "content_type":"text",
                    "title":"NTI",
                    "payload":"Department|NTI"
                },
                {
                    "content_type":"text",
                    "title":"Biblioteca",
                    "payload":"Department|BIBLIOTECA"
                },
                {
                    "content_type":"text",
                    "title":"CPAC",
                    "payload":"Department|CPAC"
                }
            ]
        }
    };

    callSendAPI(messageData);
}

function sendDepartmentResponseMessage(recipientId, name) {
    var dados;

    request("https://cpanbot.herokuapp.com/api/department/search/" + name,  function(error, response, data) {

        if (response.statusCode == 200) {

            dados = JSON.parse(data);
            var message = "";
            message += dados[0].description + "\n";

            var messageData = {
                recipient: {
                    id: recipientId
                },
                message: {
                    attachment: {
                        type: "template",
                        payload: {
                            template_type: "button",
                            text: message,
                            buttons:[{
                                type: "postback",
                                title: "Mais informações",
                                payload: "DOUBT|" + dados[0].name
                            }]
                        }
                    }
                }
            };

            callSendAPI(messageData);

        } else {
            sendTextMessage(recipientId, msg_bot.message_error_department);
        }

    });

}

function sendDepartmentDoubtResponseMessage(recipientId, name) {

    var dados;

    request("https://cpanbot.herokuapp.com/api/department/search/" + name,  function(error, response, data) {
        if (response.statusCode == 200) {

            dados = JSON.parse(data);

            var msg = "";
            if (dados[0].informations.length > 0) {
                for (var i = 0; i < dados[0].informations.length; i++) {
                    msg = "☛ " + dados[0].informations[i].question + "\n✓ " + dados[0].informations[i].answer;
                    sendTextMessage(recipientId, msg);
                }
            } else {
                sendTextMessage(recipientId, msg_bot.message_not_more_information);
            }

        } else {
            sendTextMessage(recipientId, msg_bot.message_error_more_information);
        }

    });

    setTimeout(function () {
        sendInfoMessage(recipientId, msg_bot.message_initial_question);
    }, 1500);

}

function sendCourseMessage(recipientId) {

    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: msg_bot.message_course_question,
            quick_replies: [
                {
                    "content_type":"text",
                    "title":"Bacharelado",
                    "payload":"Course|BACHARELADO"
                },
                {
                    "content_type":"text",
                    "title":"Licenciatura",
                    "payload":"Course|LICENCIATURA"
                },
                {
                    "content_type":"text",
                    "title":"Pós-graduação",
                    "payload":"Course|PÓSGRADUAÇÃO"
                },
                {
                    "content_type":"text",
                    "title":"Formas de Ingresso",
                    "payload":"Course|INGRESSO"
                }
            ]
        }
    };

    callSendAPI(messageData);

}

function sendCourseResponseMessage(recipientId, type) {

    request("https://cpanbot.herokuapp.com/api/coordination/search/" + type,  function(error, response, data) {
        if (response.statusCode == 200) {

            var dados = JSON.parse(data);
            var messageData;

            if (type == 'BACHARELADO') {
                messageData = {
                    recipient: {
                        id: recipientId
                    },
                    message: {
                        attachment: {
                            type: "template",
                            payload: {
                                template_type: "generic",
                                elements: [{
                                    title: dados[0].course,
                                    subtitle: 'Atendimento: ' + dados[0].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[0].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[1].course,
                                    subtitle: 'Atendimento: ' + dados[1].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[1].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[2].course,
                                    subtitle: 'Atendimento: ' + dados[2].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[2].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[3].course,
                                    subtitle: 'Atendimento: ' + dados[3].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[3].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[4].course,
                                    subtitle: 'Atendimento: ' + dados[4].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[4].link,
                                        title: "Acessar o Site"
                                    }],
                                }]
                            }
                        }
                    }
                };
            } else if (type == 'LICENCIATURA') {
                messageData = {
                    recipient: {
                        id: recipientId
                    },
                    message: {
                        attachment: {
                            type: "template",
                            payload: {
                                template_type: "generic",
                                elements: [{
                                    title: dados[0].course,
                                    subtitle: 'Atendimento: ' + dados[0].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[0].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[1].course,
                                    subtitle: 'Atendimento: ' + dados[1].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[1].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[2].course,
                                    subtitle: 'Atendimento: ' + dados[2].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[2].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[3].course,
                                    subtitle: 'Atendimento: ' + dados[3].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[3].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[4].course,
                                    subtitle: 'Atendimento: ' + dados[4].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[4].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[5].course,
                                    subtitle: 'Atendimento: ' + dados[5].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[5].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[6].course,
                                    subtitle: 'Atendimento: ' + dados[6].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[6].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[7].course,
                                    subtitle: 'Atendimento: ' + dados[7].office_hour,
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[7].link,
                                        title: "Acessar o Site"
                                    }],
                                }]
                            }
                        }
                    }
                };
            } else if (type == 'PÓSGRADUAÇÃO') {
                messageData = {
                    recipient: {
                        id: recipientId
                    },
                    message: {
                        attachment: {
                            type: "template",
                            payload: {
                                template_type: "generic",
                                elements: [{
                                    title: dados[0].course,
                                    subtitle: "",
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[0].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[1].course,
                                    subtitle: "",
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[1].link,
                                        title: "Acessar o Site"
                                    }],
                                }, {
                                    title: dados[2].course,
                                    subtitle: "",
                                    item_url: "",
                                    image_url: "http://epds.ufms.br/wp-content/uploads/2014/10/cpan.jpg",
                                    buttons: [{
                                        type: "web_url",
                                        url: dados[2].link,
                                        title: "Acessar o Site"
                                    }],
                                }]
                            }
                        }
                    }
                };
            }

            sendTextMessage(recipientId, msg_bot.message_course);
            setTimeout(function () {
                callSendAPI(messageData);
            }, 1500);

        } else {
            sendTextMessage(recipientId, msg_bot.message_error_course);
        }

    });

    setTimeout(function () {
        sendInfoMessage(recipientId, msg_bot.message_initial_question);
    }, 3000);

}

function sendHomeMessage(recipientId) {
    request.get("https://cpanbot.herokuapp.com/api/home/search/588a92be477461121cca10da",  function(error, response, data) {
        if (response.statusCode == 200) {

            var dados = JSON.parse(data);
            var message = dados.name;
            sendTextMessage(recipientId, message);

        } else {
            sendTextMessage(recipientId, msg_bot.message_error_form_entry);
        }

    });

    setTimeout(function () {
        sendInfoMessage(recipientId, msg_bot.message_initial_question);
    }, 1500);
}

