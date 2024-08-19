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

  searchProductById(id:string):Observable<any> {
    return this.http.get<any>('http://localhost:3000/product/' + id);
  }

  newProduct(value: any): Observable<any> {
    return this.http.post(this.url, value);
  }

  editProduct(id:string, value:any): Observable<any> {
    return this.http.put(this.url+ '/' + id, value);
  }


}
