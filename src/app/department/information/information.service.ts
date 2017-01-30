import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class InformationService {

    constructor(private http: Http) { }

    getInformations(idsetor: string) {
        return this.http.get('http://localhost:3000/api/department/' + idsetor + '/information')
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    addInformation(idsetor: string, departament: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('http://localhost:3000/api/department/' + idsetor + '/information/create', JSON.stringify(departament), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    editInformation(idsetor: string, idinfo: string, departament: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('http://localhost:3000/api/department/' + idsetor + '/information/' + idinfo, JSON.stringify(departament), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    viewInformation(idsetor: string, idinfo: string) {
        return this.http.get('http://localhost:3000/api/department/' + idsetor + '/information/' + idinfo)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    deleteInformation(idsetor: string, idinfo: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('http://localhost:3000/api/department/' + idsetor + '/information/' + idinfo, {headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

}