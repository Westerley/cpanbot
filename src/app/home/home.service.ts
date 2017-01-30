import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService{

    constructor(private http: Http) { }

    getHome() {
        return this.http.get('/api/home')
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    editHome(id: number, home: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('/api/home/' + id, JSON.stringify(home), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    viewHome(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.get('/api/home/' + id, {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

}