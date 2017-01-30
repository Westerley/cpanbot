var Phone = require('../models/phone');

exports.save = function (req, res, next) {
    var name      = req.body.name;
    var telephone = req.body.telephone;
    var option    = req.body.option;

    if (!name) {
        return res.status(422).send( { error: 'O campo nome é obrigatório'} );
    }
    if (!telephone) {
        return res.status(422).send( { error: 'O campo telefone é obrigatório'} );
    }

    var phone = new Phone();
    phone.name      = name;
    phone.telephone = telephone;
    phone.option    = option;
    phone.save(function (err, phone) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao cadastrar telefone'} );
        }
        return res.status(200).json( phone );
    });
};

exports.list = function (req, res, next) {
    Phone.find(function (err, phones) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar telefones'} );
        }

        return res.status(200).json( phones );
    });
};

exports.search = function (req, res, next) {
    Phone.find({option: req.params.search}, function (err, phones) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar telefones'} );
        }

        return res.status(200).json( phones );
    });
};

exports.show = function (req, res, next) {
    Phone.findById(req.params.id, function (err, phone) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar telefone'} );
        }
        return res.status(200).json( phone );
    });
};

exports.edit = function (req, res, next) {
    Phone.findById(req.params.id, function (err, phone) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao editar telefone'} );
        }
        var name      = req.body.name;
        var telephone = req.body.telephone;
        var option    = req.body.option;

        if (!name) {
            return res.status(422).send( { error: 'O campo nome é obrigatório'} );
        }
        if (!telephone) {
            return res.status(422).send( { error: 'O campo telefone é obrigatório'} );
        }

        phone.name      = name;
        phone.telephone = telephone;
        phone.option    = option;
        phone.save(function (err, phone) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao editar telefone'} );
            } else {
                return res.status(200).json( phone );
            }
        });
    });
};

exports.delete = function (req, res, next) {
    Phone.remove({_id: req.params.id}, function (err) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao remover telefone'} )
        }
        return res.status(200).json( {success: 'Telefone removido com sucesso'} );
    });
};