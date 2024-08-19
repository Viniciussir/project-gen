import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:3000/product';

  constructor(
    private http: HttpClient
  ) { }

  getListProduct(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  newProduct(dados: any): Observable<any> {
    return this.http.post(this.url, dados);
  }



}
