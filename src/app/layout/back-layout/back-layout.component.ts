import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { navbarType, navListActiveType } from '../../Types/navbar';

@Component({
  selector: 'app-back-layout',
  imports: [],
  templateUrl: './back-layout.component.html',
  styleUrl: './back-layout.component.scss'
})
export class BackLayoutComponent {
  navLists: navbarType[] = [
    { title: 'Home', path: '', icon: 'fa-solid fa-house-chimney' },
   // { title: 'Test', path: '/index/test', icon: 'fa-solid fa-house-chimney' },
  ]
  isActive: navListActiveType["isActive"] = true;
    pageTitle: navListActiveType["pageTitle"] = "Home";
    actionList(title: string) {
      this.pageTitle = title;
  }
  isAdminBgClass = false;
}
