import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NewsService{

    constructor(private http: Http) { }

    getNews() {
        return this.http.get('/api/news')
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    deleteNews(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('/api/news/' + id, {headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

}