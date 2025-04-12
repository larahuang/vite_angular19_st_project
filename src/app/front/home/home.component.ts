import { Component, EventEmitter, inject, OnInit, Output, signal, TemplateRef, WritableSignal  } from '@angular/core';
import { ProductsService } from '../../@sevice/productService'
import { productsType,pagePerOptionType ,addShopListType} from '../../@Type/default';
import { debounceTime, map, Observable, pipe, startWith, switchMap } from 'rxjs';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  NgbPaginationModule, NgbDropdownConfig, NgbDropdownModule,
  ModalDismissReasons, NgbDatepickerModule, NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [ CurrencyPipe,DatePipe, NgFor, NgIf,NgClass,
    NgbPaginationModule,
    NgbDropdownModule, FormsModule, ReactiveFormsModule,
     NgbDatepickerModule
   ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
   providers: [NgbDropdownConfig],
})

export class HomeComponent implements OnInit  {
[x: string]: any;
  private modalService = inject(NgbModal);

  closeResult: WritableSignal<string> = signal('');
  myProperty!: string; //使用空字串初始化
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
    private router: Router,
   public service: ProductsService,
  ) {
    this.service.getProducts();
    this.total = this.service.productLists.length;
    this.refreshProducts();
    this.myProperty = '';
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
    return this.products = this.service.productLists.filter((i: any,index,array:productsType[]) => {
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

  //算總和
  addShopLists:any[]=[]
  totalSum: number  = 0;
  isFare: boolean = false;
  getTotalSum() {
    if (this.addShopLists.length > 0) {
      let totalSumBefore = []
      this.addShopLists.forEach((item: any) => {
        totalSumBefore.push(item.productSum);

        this.totalSum = totalSumBefore.reduce((a, b) => {
          return a + b;
        }, 0);
      })
      console.log('this.totalSum', this.totalSum)
      this.hasFare(this.totalSum)

    } else {
      this.totalSum = 0;
    }
  }
  hasFare(totalSum: any) {
    if (this.totalSum===0 || totalSum >=1200) {
       this.isFare = false;
    } else {
      this.isFare = true;
       this.totalSum = totalSum + 120;
    }
  }
  addItem(i: any, index: number) {
    this.addShopLists[index].productQuantity++;
    this.addShopLists[index].productSum = (this.addShopLists[index].productQuantity) * this.addShopLists[index].productPrice;
    this.getTotalSum();
  }
  minuItem(i: any, index: number) {
    if (this.addShopLists[index].productQuantity ===1) {
        this.addShopLists[index].productQuantity--;
      this.addShopLists.splice(index, 1);
      this.getTotalSum();
      if (this.totalSum===0 ) {
        this.isFare = false;

      }

    } else {
      this.addShopLists[index].productQuantity--;
      this.addShopLists[index].productSum = (this.addShopLists[index].productQuantity) * this.addShopLists[index].productPrice;
      this.getTotalSum();
       if (this.totalSum===0 ) {
        this.isFare = false;
        this.getTotalSum();
      }
    }
  }
  isOpenCart: boolean = false;
  openCart() {
    this.isOpenCart = !this.isOpenCart;
  }
  viewProduct(e: Event, item: any): void {
    e.stopPropagation();
  console.log(item)
    this.router.navigate(["/index/product/"+item._id]);
  }
  isAddShop: boolean = false;
  initAddShop: addShopListType[] = [];
  //新增到購物車
  addToShop(e: Event, item: any) {
    e.stopPropagation()
    let query = {
      "customerId": Date.now().toString,
      "customerName": "Lara",
      "email": "email@gmail.com",
      "phone": "0912345678",
      "city": "city",
      "town": "town",
      "add_detail": "add_detail",
    }
    this.isAddShop = true;
    let addProductItemQuery: addShopListType = {
      categoryId: item.categoryId,
      category: item.category,
      productId: item._id,
      productName: item.name,
      productPrice: item.price,
      productQuantity: 1,
      productSum: item.price * 1
    }
    this.initAddShop.push(addProductItemQuery);
    this.uniqueAddShop(this.initAddShop)
    this.getTotalSum();
  }
  // 獨特陣列（去除重複）
  uniqueAddShop(initAddShop:any) {
    let uniqueLists = [];
    uniqueLists = Array.from(new Set(initAddShop.map((item:any) => JSON.stringify(item)))).map((item:any) => JSON.parse(item));
    this.addShopLists = uniqueLists;
  }
  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  ngOnInit() {
    this.searchProducts();
  }
}
