import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  public get<T>(controller: string, headers: HttpHeaders, params: any = {}) {
    const httpOptions = {
      headers,
      params
    };

    return this.http.get(`${environment.serverURL}/${controller}`, httpOptions);
  }
}
