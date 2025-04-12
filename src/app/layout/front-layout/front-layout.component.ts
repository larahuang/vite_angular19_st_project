import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductsService } from '../../@sevice/productService';
import { navbarType, navListActiveType } from '../../Types/navbar';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-front-layout',
  imports: [RouterOutlet ,NavbarComponent],
  templateUrl: './front-layout.component.html',
  styleUrl: './front-layout.component.scss'
})

export class FrontLayoutComponent implements OnInit{
  navLists: navbarType[] = [
    { title: '首頁', path: '', icon: 'fa-solid fa-house-chimney' },
    { title: '產品介紹', path: '/index/products', icon: 'fa-solid fa-house-chimney' },
  ]
  isActive: navListActiveType["isActive"] = true;
  pageTitle: navListActiveType["pageTitle"] = "首頁";
  chargeAddShopLists: any[] = [];
  chargeAddShopListsLength: number = 0;
  changeTotalSum:number|any =0
  constructor(
    public service: ProductsService,
  ) {
    this.chargeAddShopLists = this.service.addShopLists;
  }
  actionList(title: string) {
      this.pageTitle = title;
  }

  isAdminBgClass = false;
  ngOnInit() : void{
  }
}
