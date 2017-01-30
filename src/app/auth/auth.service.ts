import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService{

    isLoggedInEmitter = new EventEmitter<boolean>();

    constructor(private http: Http) { }

    login(user: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user/login', JSON.stringify(user), {headers: headers})
            .map((res: Response) => {
                var jwt = res.json();
                localStorage.setItem('auth_token', jwt.token);
                this.isLoggedInEmitter.emit(true);
                return res.json();
            })
            .catch(err => Observable.throw(err.json()));
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.isLoggedInEmitter.emit(false);
    }

}