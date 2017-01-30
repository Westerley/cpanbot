import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{

    constructor(private http: Http) { }

    getUsers() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.get('/api/user', {headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    addUser(user: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('/api/user/create', JSON.stringify(user), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    editUser(id: number, user: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('/api/user/' + id, JSON.stringify(user), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    editPassword(id: number, user: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('/api/user/pass/' + id, JSON.stringify(user), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    viewUser(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.get('/api/user/' + id, {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    deleteUser(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('/api/user/' + id, {headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

}