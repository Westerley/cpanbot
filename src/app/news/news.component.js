"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var news_service_1 = require('./news.service');
var NewsComponent = (function () {
    function NewsComponent(router, newsService) {
        var _this = this;
        this.router = router;
        this.newsService = newsService;
        this.news = [];
        this.newsService.getNews()
            .subscribe(function (res) {
            _this.news = res;
        }, function (err) {
            alert('Não foi possivel carregar as notícias');
        });
    }
    NewsComponent.prototype.ngOnInit = function () {
    };
    NewsComponent.prototype.deleteNews = function (id) {
        var _this = this;
        var question = confirm("Deseja deletar a notícia?");
        if (question) {
            this.newsService.deleteNews(id)
                .subscribe(function (res) {
                var news = _this.news;
                for (var i = 0; i < news.length; i++) {
                    if (news[i]._id == id) {
                        news.splice(i, 1);
                    }
                }
            }, function (err) {
                alert('Não foi possivel deletar a notícia');
            });
        }
    };
    NewsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-news',
            templateUrl: "./news.component.html",
            styleUrls: ['../app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, news_service_1.NewsService])
    ], NewsComponent);
    return NewsComponent;
}());
exports.NewsComponent = NewsComponent;
//# sourceMappingURL=news.component.js.map