import { Injectable } from '@angular/core';
import { ApiService } from './apiServic';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { productsType } from '../@Type/default';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  productLists: productsType[] = [];
  products = new BehaviorSubject<productsType[]>([]);
  products$: Observable<productsType[]> = this.products.asObservable();
  productsLength = new BehaviorSubject<number>(0);
  productsLength$: Observable<number> = this.productsLength.asObservable();
  constructor(private apiService:ApiService) {

  }
  getProducts() {
    this.apiService.getProductsData()
      .pipe(
         catchError(error => {
        console.error("Error en la petición:", error);
        return of([]);
        })
      )
      .subscribe(res => {
        this.productLists = res;
        this.products.next(this.productLists);
        this.productsLength.next(res.length);

      })
  }
}
