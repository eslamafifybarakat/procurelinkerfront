import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { roots } from '../../../shared/configs/endPoints';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RolesManagementService {
  baseUrl: string = environment?.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getRolesManagement(): Observable<any> {
    return this.http?.get(`${this.baseUrl}/${roots?.dashboard?.users?.getRolesManagement}`)
  }
}
