import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PhoneService{

    constructor(private http: Http) { }

    getPhone() {
        return this.http.get('/api/phone')
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    addPhone(phone: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('/api/phone/create', JSON.stringify(phone), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    editPhone(id: number, phone: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('/api/phone/' + id, JSON.stringify(phone), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    viewPhone(id: number) {
        return this.http.get('/api/phone/' + id)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    deletePhone(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('/api/phone/' + id, {headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

}