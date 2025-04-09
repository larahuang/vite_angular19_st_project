import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../@sevice/productService'
import { productsType,pagePerOptionType } from '../../@Type/default';
import { debounceTime, map, Observable, pipe, startWith, switchMap } from 'rxjs';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NgbPaginationModule, NgbDropdownConfig, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [ CurrencyPipe, NgFor, NgIf,NgClass,
    NgbPaginationModule,
     NgbDropdownModule,FormsModule, ReactiveFormsModule
   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
   providers: [NgbDropdownConfig],
})

export class HomeComponent implements OnInit  {
  products$: Observable<productsType[]>| any |undefined
  isGrid: boolean = false;

  // 分頁
  total$: Observable<number> | any;
  total:number=1;
  products:productsType[]=[]
  page = 1;
  pageSize = 10;

  // 搜尋
  searchingInputControl = new FormControl();

  constructor(
   private service: ProductsService,
  ) {
    this.service.getProducts();
    this.total = this.service.productLists.length;
    this.refreshProducts();
  }

  refreshProducts() {
     this.products = this.searchResult.map((products:any, i:number) => ({ id: i + 1, ...products })).slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
    );

  }

  changeGrid() {
    this.isGrid = !this.isGrid
  }

  pagePerOptions:pagePerOptionType[] = [
    { value: 5, label: '5筆' },
    { value: 10, label: '10筆' },
    { value: 15, label: '15筆' },
    { value: 20, label: '20筆' },
    { value: 30, label: '30筆' },
    { value: 40, label: '40筆' },
    { value: 50, label: '50筆' },
  ]

  changeItemsPerPage(item: any) {
    this.pageSize = item.value;
    this.refreshProducts();
  }
  // 搜尋引擎
  searchStation(value:string) {
    return this.products = this.service.productLists.filter((i: any) => {
      let valueToLowerCase = value.toLowerCase()
        if (i.name.toLowerCase().indexOf(valueToLowerCase)!==-1 || i.category.toLowerCase().indexOf(valueToLowerCase)!==-1 || i.content.toLowerCase().indexOf(valueToLowerCase)!==-1) {
          return i
        }
    })
  }
  searchResult: productsType[] = [];
  searchResultTotal:number= 1;
  searchProducts() {
    this.searchingInputControl.valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      switchMap(async (value) => this.searchStation(value))
    ).subscribe((products) => {
      this.searchResult = products;
      this.searchResultTotal = products.length;
      this.refreshProducts()
    });
  }
  ngOnInit() {
    this.searchProducts()
  }
}
