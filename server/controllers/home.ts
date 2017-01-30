var Home = require('../models/home');

exports.save = function (req, res, next) {
    var name      = req.body.name;

    if (!name) {
        return res.status(422).send( { error: 'O campo nome é obrigatório'} );
    }

    var home = new Home();
    home.name = name;
    home.save(function (err, home) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao cadastrar informação'} );
        }
        return res.status(200).json( home );
    });
};

exports.list = function (req, res, next) {
    Home.find(function (err, home) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar informação'} );
        }

        return res.status(200).json( home );
    });
};

exports.search = function (req, res, next) {
    Home.find({option: req.params.search}, function (err, home) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar informação'} );
        }

        return res.status(200).json( home );
    });
};

exports.show = function (req, res, next) {
    Home.findById(req.params.id, function (err, home) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar informação'} );
        }
        return res.status(200).json( home );
    });
};

exports.edit = function (req, res, next) {
    Home.findById(req.params.id, function (err, home) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao editar informação'} );
        }

        var name = req.body.name;

        if (!name) {
            return res.status(422).send({error: 'O campo nome é obrigatório'});
        }

        home.name = name;
        home.save(function (err, home) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao editar informação'} );
            } else {
                return res.status(200).json( home );
            }
        });
    });
};
