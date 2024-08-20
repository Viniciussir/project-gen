import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'http://localhost:3000/product';

  constructor(
    private http: HttpClient
  ) { }

  getListProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  searchProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  newProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.url, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data' - Não é necessário definir explicitamente
      })
    });
  }

  editProduct(id: string, formData: FormData): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, formData, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        // 'Content-Type': 'multipart/form-data' // Não defina esse cabeçalho manualmente
      })
    });
  }  

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}