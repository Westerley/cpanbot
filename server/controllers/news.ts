var News    = require('../models/news'),
    request = require('request'),
    cheerio = require('cheerio');

exports.save = function (req, res, next) {

    request({
        method: "GET",
        "rejectUnauthorized": false,
        "url": "https://cpan.ufms.br/noticias/"}, function(error, response, html){

        if(!error){

            var $ = cheerio.load(html);
            var cont = 0;

            $('.box-border .noticia').each(function(){

                if (cont < 3) {
                    var title = $(this).find('.media-heading a').text().trim();
                    var linkImage = $(this).find('a img').first().attr('src');
                    var infodata = $(this).find('.noticia-info li time').text().trim();
                    var link = $(this).find('.media-heading a').attr('href');

                    News.findOne({'title': title}, function (err, findnews) {
                        if (!findnews) {
                            var news = new News();
                            news.title = title;
                            news.link = link;
                            news.linkImage = linkImage;
                            news.infodata = infodata;
                            news.save();
                        }
                    });
                }
                cont++;

            });

            return res.status(200).json( {success: "Notícia salva"} );

        } else {
            return res.status(204).json( {success: "Não foi possível salva a notícia"} );
        }

    });

};

exports.list = function (req, res, next) {
    News.find(function (err, news) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar notícias'} );
        }

        return res.status(200).json( news );
    });
};

exports.listBot = function (req, res, next) {
    News.find({}).limit(3).sort({ '_id': -1 }).exec(function (err, news) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao buscar notícias'} );
        }

        return res.status(200).json( news );
    });
};

exports.delete = function (req, res, next) {
    News.remove({_id: req.params.id}, function (err, news) {
        if (err) {
            return res.status(422).send( {error: 'Erro ao remover notícia'} )
        }
        return res.status(200).json( {success: 'Notícia removida com sucesso'} );
    });
};