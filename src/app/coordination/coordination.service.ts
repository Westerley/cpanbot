import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CoordinationService{

    constructor(private http: Http) { }

    getCoordination() {
        return this.http.get('/api/coordination')
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    addCoordination(coordination: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('/api/coordination/create', JSON.stringify(coordination), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    editCoordination(id: number, coordination: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('/api/coordination/' + id, JSON.stringify(coordination), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    viewCoordination(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.get('/api/coordination/' + id, {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    deleteCoordination(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('/api/coordination/' + id, {headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

}