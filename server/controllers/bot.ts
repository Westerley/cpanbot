var express    = require('express'),
    config     = require('../config/config'),
    request    = require('request'),
    natural    = require('natural'),
    bodyParser = require('body-parser'),
    PortugueseStemmer = require('snowball-stemmer.jsx/dest/portuguese-stemmer.common.js').PortugueseStemmer,
    stemmer    = new PortugueseStemmer(),
    classifier = new natural.BayesClassifier(),
    app        = express();

function removeAccent(str) {
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

function stemming(str) {
    var new_text = "";
    str = str.split(" ");
    for (var i = 0; i < str.length; i++) {
        new_text += " " + removeAccent(stemmer.stemWord(str[i]));
    }
    return new_text.trim();
}

function trainData() {
    classifier.addDocument('noticias', 'notic');
    classifier.addDocument('informacoes', 'inform');
    classifier.addDocument('setor', 'department');
    classifier.addDocument('departamento', 'department');
    classifier.addDocument('telefone', 'telefon');
    classifier.addDocument('tel cel', 'telefon');
    classifier.addDocument('curso', 'cours');
    classifier.addDocument('nao tchau bye',  'no');
    classifier.addDocument('oi', 'initial');
    classifier.addDocument('ola', 'initial');
    classifier.addDocument('bom dia', 'initial');
    classifier.addDocument('boa tarde', 'initial');
    classifier.addDocument('boa noite', 'initial');
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
            sendCourseResponseMessage(senderID, quickPayload[1]);
        }

        return;
    }

    if (messageText) {

        natural.BayesClassifier.load('classifier.json', null, function(err, classifier) {

            messageText = classifier.getClassifications(removeAccent(messageText));

            var result = false;
            for (var i = 0; i < messageText.length; i++) {
                if (messageText[i].value > 0.34) {
                    result = true;
                }
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
                    sendInfoMessage(senderID);
                    break;
                case 'telefon':
                    sendPhoneMessage(senderID);
                    break;
                case 'department':
                    sendDepartmentMessage(senderID);
                    break;
                case 'no':
                    sendTextMessage(senderID, "Ok, volte sempre!!!");
                    break;
                case 'initial':
                    sendMessage(senderID, "Olá, veja abaixo as categorias em que posso te ajudar ou você pode me fazer uma pergunta.");
                    break;
                case 'cours':
                    sendCourseMessage(senderID);
                    break;
                default:
                    sendMessage(senderID,  "Desculpe, eu não entendi o que você digitou. Tente me perguntar de uma maneira diferente, ou selecione " +
                        "uma das categorias abaixo!");
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
        sendInfoMessage(senderID);
    } else if (payload[0] == "PHONE") {
        sendPhoneMessage(senderID);
    } else if (payload[0] == "DEPARTMENT") {
        sendDepartmentMessage(senderID)
    } else if (payload[0] == 'DOUBT') {
        sendDepartmentDoubtResponseMessage(senderID, payload[1]);
    } else if (payload[0] == 'COURSES') {
        sendCourseMessage(senderID);
    } else if (payload[0] == "USER_DEFINED_PAYLOAD") {
        sendTextMessage(senderID, "Olá, eu sou o CPAN BOT. Eu posso lhe enviar informações " +
            "sobre o Câmpus do Pantanal (UFMS), e as últimas notícias postadas no site para te manter atualizado. ");
        sendMessage(senderID,  "Veja abaixo as categorias em que posso te ajudar ou você pode me fazer uma pergunta.");
    }

    //sendTextMessage(senderID);
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

    request("http://localhost:3000/api/news/list",  function(error, response, data) {
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

            sendTextMessage(recipientId, "Aqui estão as últimas notícias postadas no site! ;)");
            setTimeout(function () {
                callSendAPI(messageData);
            }, 1000);

        } else {
            sendTextMessage(recipientId, "Não foi possível buscar as notícias");
        }

    });

    setTimeout(function () {
        sendMessage(recipientId, "Deseja algo mais?");
    }, 1500);

}

function sendInfoMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Quais informações você deseja?",
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
            text: "Quais telefones você deseja?",
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

    request.get("http://localhost:3000/api/phone/search/" + name,  function(error, response, data) {
        if (response.statusCode == 200) {

            dados = JSON.parse(data);
            var message = "";
            for (var i = 0; i < dados.length; i++){
                message += dados[i].name + ": " + dados[i].telephone + "\n";
            }
            sendTextMessage(recipientId, message);

        } else {
            sendTextMessage(recipientId, "Não foi possível buscar telefone");
        }

    });

    setTimeout(function () {
        sendMessage(recipientId, "Deseja algo mais?");
    }, 1500);

}

function sendDepartmentMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "Qual setor você deseja?",
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

    request("http://localhost:3000/api/department/search/" + name,  function(error, response, data) {
        if (response.statusCode == 200) {

            dados = JSON.parse(data);
            var message = "";
            message += '✓ SETOR: ' + dados[0].name + "\n";
            message += '✓ DESCRIÇÃO: ' + dados[0].description + "\n";
            message += '✓ SUPERVISOR: ' + dados[0].supervisor + "\n";
            message += '✓ TELEFONE: ' + dados[0].phone + "\n";
            message += '✓ EMAIL: ' + dados[0].email + "\n";
            message += '✓ HORÁRIO: ' + dados[0].hours_operation + "\n";
            message += '✓ LOCALIZAÇÃO: ' +  dados[0].place + "\n";

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
            sendTextMessage(recipientId, "Não foi possível buscar o setor");
        }

    });

}

function sendDepartmentDoubtResponseMessage(recipientId, name) {

    var dados;

    request("http://localhost:3000/api/department/search/" + name,  function(error, response, data) {
        if (response.statusCode == 200) {

            dados = JSON.parse(data);

            var message = "";
            if (dados[0].informations.length > 0) {
                for (var i = 0; i < dados[0].informations.length; i++) {
                    message += "☛ " + dados[0].informations[i].question + "\n✓ " + dados[0].informations[i].answer;
                    message += "\n\n";
                }
            } else {
                message = "Ops, neste setor não tem mais informações :/";
            }

            sendTextMessage(recipientId, message);

        } else {
            sendTextMessage(recipientId, "Não foi possível buscar mais informações");
        }

    });

    setTimeout(function () {
        sendMessage(recipientId, "Deseja algo mais?");
    }, 1500);

}

function sendCourseMessage(recipientId) {

    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "Qual curso você deseja?",
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
                }
            ]
        }
    };

    callSendAPI(messageData);

}

function sendCourseResponseMessage(recipientId, type) {

    var dados;

    request("http://localhost:3000/api/coordination/search/" + type,  function(error, response, data) {
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
                                title: dados[0].course,
                                subtitle: dados[0].office_hour,
                                item_url: "",
                                image_url: "http://cpan.sites.ufms.br/files/2015/02/cpan-240x.jpg",
                                buttons: [{
                                    type: "web_url",
                                    url: dados[0].link,
                                    title: "Acessar o Site"
                                }],
                            }]
                        }
                    }
                }
            };

            sendTextMessage(recipientId, "Aqui estão os cursos oferecidos pelo CPAN! ;)");
            setTimeout(function () {
                callSendAPI(messageData);
            }, 1000);

        } else {
            sendTextMessage(recipientId, "Não foi possível buscar os cursos");
        }

    });

    setTimeout(function () {
        sendMessage(recipientId, "Deseja algo mais?");
    }, 2000);

}

