var Department  = require('../models/department'),
    Phone       = require('../models/phone');

exports.save = function (req, res, next) {
    var name            = req.body.name;
    var description     = req.body.description;

    if (!name) { return res.status(422).send({ error: 'O campo nome é obrigatório'}); }
    if (!description) { return res.status(422).send({ error: 'O campo descrição é obrigatório'}); }

    var newDepartment = new Department();
    newDepartment.name = name;
    newDepartment.description = description;
    newDepartment.informations = [];
    newDepartment.save(function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao cadastrar setor'} );
        }
        return res.status(200).json( department );
    });
};

exports.list = function (req, res, next) {
    Department.find(function (err, departments) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar setores'} );
        }
        return res.status(200).json( departments );
    });
};

exports.search = function (req, res, next) {
    var result;
    Department.find({name: req.params.search}, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar setor'} );
        }
        result = [ { name: department[0].name, description: department[0].description,  informations: department[0].informations } ];
        return res.status(200).json( result );
    });
};

exports.show = function (req, res, next) {
    Department.findById(req.params.id, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar setor'} );
        }
        return res.status(200).json( department );
    });
};

exports.edit = function (req, res, next) {
    Department.findById(req.params.id, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar setor'} );
        }

        var name            = req.body.name;
        var description     = req.body.description;

        if (!name) { return res.status(422).send({ error: 'O campo nome é obrigatório'}); }
        if (!description) { return res.status(422).send({ error: 'O campo descrição é obrigatório'}); }

        department.name = name;
        department.description = description;
        department.save(function (err) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao editar setor'} );
            }
            return res.status(200).json( department );
        });
    });
};

exports.delete = function (req, res, next) {
    Department.remove({_id: req.params.id}, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao remover setor'} );
        }
        return res.status(200).json( {success: 'Setor removido com sucesso'} );
    });
};

exports.insertInformation = function (req, res, next) {
    Department.findById(req.params.id, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar setor'} );
        }

        var question = req.body.question;
        var answer   = req.body.answer;

        if (!question) { return res.status(422).send({ error: 'O campo pergunta é obrigatório'}); }
        if (!answer) { return res.status(422).send({ error: 'O campo resposta é obrigatório'}); }

        var Information = {
            question: question,
            answer  : answer
        };
        department.informations.push(Information);
        department.save(function (err) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao cadastrar pergunta'} );
            }
            return res.status(200).json( department.informations );
        });
    });
};

exports.editInformation = function (req, res, next) {
    Department.findById(req.params.idsetor, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar pergunta'} );
        }

        var question = req.body.question;
        var answer   = req.body.answer;

        if (!question) { return res.status(422).send({ error: 'O campo pergunta é obrigatório'}); }
        if (!answer) { return res.status(422).send({ error: 'O campo resposta é obrigatório'}); }

        department.informations.id(req.params.idinfo).question = req.body.question;
        department.informations.id(req.params.idinfo).answer   = req.body.answer;
        department.save(function (err) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao editar pergunta'} );
            }
            return res.status(200).json( department.informations );
        });
    });
};

exports.viewInformation = function (req, res, next) {
    Department.findById(req.params.idsetor, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar setor'} );
        }

        var Information = {
            id: department.informations.id(req.params.idinfo)._id,
            question: department.informations.id(req.params.idinfo).question,
            answer  : department.informations.id(req.params.idinfo).answer
        };

        return res.status(200).json( Information );
    });
};

exports.listInformations = function (req, res, next) {
    Department.findById(req.params.idsetor, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar perguntas'} );
        }
        return res.status(200).json( department.informations );
    });
};

exports.removeInformation = function (req, res, next) {
    Department.findById(req.params.idsetor, function (err, department) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar pergunta'} );
        }
        department.informations.id(req.params.idinfo).remove();
        department.save(function (err) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao remover pergunta'} );
            }
            return res.status(200).json( {success: 'Pergunta removida com sucesso'} );
        });
    });
};


