import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postProduct(data: any) {
    return this.http.post('http://localhost:3000/products', data);
  }

  getAllProducts(): Observable<any> {
    return this.http.get('http://localhost:3000/products');
  }
}
