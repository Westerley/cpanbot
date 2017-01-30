var Coordination  = require('../models/coordination');

exports.save = function (req, res, next) {
    var course      = req.body.course;
    var type        = req.body.type;
    var coordinator = req.body.coordinator;
    var office_hour = req.body.office_hour;
    var link        = req.body.link;

    if (!course) { return res.status(422).send({ error: 'O campo curso é obrigatório'}); }
    if (!coordinator) { return res.status(422).send({ error: 'O campo coordenador(a) é obrigatório'}); }
    if (!office_hour) { return res.status(422).send({ error: 'O campo horário de atendimento é obrigatório'}); }
    if (!link) { return res.status(422).send({ error: 'O campo link da página é obrigatório'}); }
    if (!type) { return res.status(422).send({ error: 'O campo tipo do curso é obrigatório'}); }

    var newCoordination = new Coordination();
    newCoordination.course      = course;
    newCoordination.coordinator = coordinator;
    newCoordination.type        = type;
    newCoordination.office_hour = office_hour;
    newCoordination.link        = link;
    newCoordination.save(function (err, coordination) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao cadastrar coordenação'} );
        }
        return res.status(200).json( coordination );
    });
};

exports.list = function (req, res, next) {
    Coordination.find(function (err, coordination) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar coordenação'} );
        }
        return res.status(200).json( coordination );
    });
};

exports.search = function (req, res, next) {
    Coordination.find({type: req.params.search}, function (err, coordination) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar coordenação'} );
        }
        return res.status(200).json( coordination );
    });
};

exports.show = function (req, res, next) {
    Coordination.findById(req.params.id, function (err, coordination) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar coordenação'} );
        }
        return res.status(200).json( coordination );
    });
};

exports.edit = function (req, res, next) {
    Coordination.findById(req.params.id, function (err, coordination) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar coordenação'} );
        }

        var course      = req.body.course;
        var coordinator = req.body.coordinator;
        var type        = req.body.type;
        var office_hour = req.body.office_hour;
        var link        = req.body.link;

        if (!course) { return res.status(422).send({ error: 'O campo curso é obrigatório'}); }
        if (!coordinator) { return res.status(422).send({ error: 'O campo coordenador(a) é obrigatório'}); }
        if (!office_hour) { return res.status(422).send({ error: 'O campo horário de atendimento é obrigatório'}); }
        if (!link) { return res.status(422).send({ error: 'O campo link da página é obrigatório'}); }
        if (!type) { return res.status(422).send({ error: 'O campo tipo do curso é obrigatório'}); }

        coordination.course = course;
        coordination.coordinator = coordinator;
        coordination.type = type;
        coordination.office_hour = office_hour;
        coordination.link = link;
        coordination.save(function (err) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao editar coordenação'} );
            }
            return res.status(200).json( coordination );
        });
    });
};

exports.delete = function (req, res, next) {
    Coordination.remove({_id: req.params.id}, function (err, coordination) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao remover coordenação'} );
        }
        return res.status(200).json( {success: 'Coordenação removida com sucesso'} );
    });
};


