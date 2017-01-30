import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DepartmentService{

    constructor(private http: Http) { }

    getDepartments() {
        return this.http.get('/api/department')
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    addDepartment(department: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.post('/api/department/create', JSON.stringify(department), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    editDepartment(id: number, department: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.put('/api/department/' + id, JSON.stringify(department), {headers: headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    viewDepartment(id: number) {
        return this.http.get('/api/department/' + id)
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

    deleteDepartment(id: number) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + localStorage.getItem('auth_token'));
        return this.http.delete('/api/department/' + id, {headers})
            .map(res => res.json())
            .catch(err => Observable.throw(err.json()));
    }

}