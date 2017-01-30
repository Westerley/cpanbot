import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { News } from './news';
import { NewsService } from './news.service';

@Component({
    moduleId: module.id,
    selector: 'app-news',
    templateUrl: `./news.component.html`,
    styleUrls: ['../app.component.css']
})

export class NewsComponent implements OnInit {

    news: News[] = [];

    constructor(private router: Router, private newsService: NewsService) {
        this.newsService.getNews()
            .subscribe(res => {
                this.news = res;
            }, err => {
                if (typeof err.error === 'undefined') {
                    this.router.navigate(['/login']);
                }
                alert('Não foi possivel carregar as notícias');
            });
    }

    ngOnInit() {
    }

    deleteNews(id: number) {
        var question = confirm("Deseja deletar a notícia?");
        if (question) {
            this.newsService.deleteNews(id)
                .subscribe(res => {
                    var news = this.news;
                    for (var i = 0; i < news.length; i++) {
                        if (news[i]._id == id) {
                            news.splice(i, 1);
                        }
                    }
                }, err => {
                    if (typeof err.error === 'undefined') {
                        this.router.navigate(['/login']);
                    } else {
                        alert('Não foi possivel deletar a notícia');
                    }
                });
        }
    }

}