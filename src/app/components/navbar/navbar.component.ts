import { Component, OnInit, Input, Output, EventEmitter, computed, effect, signal, inject } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { NgFor, NgClass, NgIf, JsonPipe } from '@angular/common';
import { ProductsService } from '../../@sevice/productService';
import { navbarType } from '../../@Type/default'
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgFor,NgClass,NgIf ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
   public getTotalSum = inject(ProductsService);
  constructor(private router: Router,
  ) {
  }
  @Input() sendNavLists!: navbarType[];
  @Input() sendPageTitle!: string;
  @Input() sendIsActive!: boolean;
  @Input() sendIsAdminBgClass!: boolean;
  @Output() newPageTitle = new EventEmitter<string>();
  @Output() newSendSignPath = new EventEmitter<string>();

  sendActionList(path: string) {
    this.newPageTitle.emit(path);
  }

  sendSignOut() {
    this.newSendSignPath.emit();
  }


  ngOnInit(): void {

   }

}
