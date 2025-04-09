import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment'
import { productsType } from '../@Type/default'

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) { }

  getProductsData() {
    return this.http.get<productsType[]>(`${environment.webApi}/api/products`);
  }
}
