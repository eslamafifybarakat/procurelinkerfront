import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';
import { roots } from './../../shared/configs/endPoints';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  apiUrl = environment?.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getBranches(search?: any): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.append("search", search);
    }
    return this.http.get<any>(this.apiUrl + roots?.dashboard?.settings?.getBranches, { params: params });
  }
  saveBranch(data: any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + roots?.dashboard?.settings?.saveBranch, data);
  }
  getBranchById(id?: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.append("Id", id);
    }
    return this.http.get<any[]>(this.apiUrl + roots?.dashboard?.settings?.getBranchesById + '?Id=' + id);
  }
  deleteBranch(id: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.append("Id", id);
    }
    return this.http.delete<any>(this.apiUrl + roots?.dashboard?.settings?.deleteBranch, { params: params });
  }


  getDepartments(search?: any): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.append("search", search);
    }
    return this.http.get<any>(this.apiUrl + roots?.dashboard?.settings?.getDepartments, { params: params });
  }
  saveDepartment(data: any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + roots?.dashboard?.settings?.saveDepartments, data);
  }
  getDepartmentById(id?: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.append("Id", id);
    }
    return this.http.get<any[]>(this.apiUrl + roots?.dashboard?.settings?.getDepartmentsById + '?Id=' + id);
  }
  deleteDepartment(id: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.append("Id", id);
    }
    return this.http.delete<any>(this.apiUrl + roots?.dashboard?.settings?.deleteDepartments, { params: params });
  }


  getJobTitles(search?: any): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.append("search", search);
    }
    return this.http.get<any>(this.apiUrl + roots?.dashboard?.settings?.getJobTitle, { params: params });
  }
  saveJobTitles(data: any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + roots?.dashboard?.settings?.saveJobTitle, data);
  }
  getJobTitlesById(id?: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.append("Id", id);
    }
    return this.http?.get<any[]>(this.apiUrl + roots?.dashboard?.settings?.getJobTitleById + '?Id=' + id);
  }
  deleteJobTitles(id: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.append("Id", id);
    }
    return this.http.delete<any>(this.apiUrl + roots?.dashboard?.settings?.deleteJobTitle, { params: params });
  }


  getPositions(search?: any): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params.append("search", search);
    }
    return this.http.get<any>(this.apiUrl + roots?.dashboard?.settings?.getPositions, { params: params });
  }
  savePosition(data: any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl + roots?.dashboard?.settings?.savePosition, data);
  }
  getPositionById(id?: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.append("Id", id);
    }
    return this.http?.get<any[]>(this.apiUrl + roots?.dashboard?.settings?.getPositionById + '?Id=' + id);

  }
  deletePosition(id: any): Observable<any> {
    let params = new HttpParams();
    if (id) {
      params = params.append("Id", id);
    }
    return this.http.delete<any>(this.apiUrl + roots?.dashboard?.settings?.deletePosition, { params: params });
  }

}
