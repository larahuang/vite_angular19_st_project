import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { navbarType,navListActiveType } from '../../Types/navbar';
@Component({
  selector: 'app-front-layout',
  imports: [RouterOutlet ,NavbarComponent],
  templateUrl: './front-layout.component.html',
  styleUrl: './front-layout.component.scss'
})
export class FrontLayoutComponent {
  navLists: navbarType[] = [
    { title: 'Home', path: '', icon: 'fa-solid fa-house-chimney' },
    { title: 'Products', path: '/index/products', icon: 'fa-solid fa-house-chimney' },
  ]
  isActive: navListActiveType["isActive"] = true;
    pageTitle: navListActiveType["pageTitle"] = "Home";
    actionList(title: string) {
      this.pageTitle = title;
    }
    isAdminBgClass = false;
}
