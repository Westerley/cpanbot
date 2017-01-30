var User = require('../models/user');

exports.login = function (req, res, next) {

    var email     = req.body.email;
    var password  = req.body.password;

    if (!email) {
        return res.status(422).send({ error: 'O campo email é obrigatório'});
    }
    if (!password) {
        return res.status(422).send({ error: 'O campo senha é obrigatório'});
    }

    User.findOne({ email: email }, function(err, user) {
        if(err) {
            return res.status(422).send( {error: 'Erro ao buscar usuário'} );
        }
        if (!user) {
            return res.status(422).send( {error: 'E-mail não encontrado'} );
        }  else {
            if (user.comparePassword(password)) {
                var token = user.generateToken(user._id, user.name, user.email);
                return res.status(200).json( { token: token} );
            } else {
                return res.status(422).send( {error: err} );
            }
        }
    });
};

exports.save = function(req, res, next) {

    var name      = req.body.name;
    var email     = req.body.email;
    var password  = req.body.password;
    var password2 = req.body.password2;

    if (!name) {
        return res.status(422).send({ error: 'O campo nome é obrigatório'});
    }
    if (!email) {
        return res.status(422).send({ error: 'O campo email é obrigatório'});
    }
    if (!password) {
        return res.status(422).send({ error: 'O campo senha é obrigatório'});
    }
    if (password != password2) {
        return res.status(422).send({ error: 'O campo confirmar senha está incorreta'});
    }

    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao cadastrar usuário'} );
        } else if (user) {
            return res.status(422).send( {error: 'Email já existente'} );
        } else {
            var newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save(function (err, user) {
                if (err) {
                    return res.status(422).send( {error: 'Erro ao cadastrar usuário'} );
                } else {
                    return res.status(200).json( user );
                }
            });
        }
    });
};

exports.list = function (req, res, next) {
    User.find(function (err, users) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar usuários'} );
        }

        return res.status(200).json( users );
    });
};

exports.show = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar usuário'} );
        }
        return res.status(200).json( user );
    });
};

exports.edit = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao editar usuário'} );
        }

        var name  = req.body.name;
        var email = req.body.email;

        if (!name) {
            return res.status(422).send({ error: 'O campo nome é obrigatório'});
        }
        if (!email) {
            return res.status(422).send({ error: 'O campo email é obrigatório'});
        }

        user.name = name;
        user.email = email;
        user.save(function (err, user) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao editar usuário'} );
            }
            return res.status(200).json( {success: 'Usuário atualizado com sucesso'} );
        });

    });
};

exports.editPassword = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao editar usuário'} );
        }

        var password  = req.body.password;
        var password2 = req.body.password2;

        if (!password) {
            return res.status(422).send({ error: 'O campo senha é obrigatório'});
        }
        if (password != password2) {
            return res.status(422).send({ error: 'O campo confirmar senha está incorreta'});
        }

        user.password = user.generateHash(password);
        user.save(function (err, user) {
            if (err) {
                return res.status(422).send( {error: 'Erro ao editar usuário'} );
            }
            return res.status(200).json( user );
        });

    });
};

exports.delete = function (req, res, next) {
    User.remove({_id: req.params.id}, function (err) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao remover usuário'} )
        }
        return res.status(200).json( {success: 'Usuário removido com sucesso'} );
    });
};