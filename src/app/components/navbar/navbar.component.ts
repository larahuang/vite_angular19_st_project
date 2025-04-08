import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { NgFor,NgClass, NgIf } from '@angular/common';
import { navbarType } from '../../Types/navbar'
@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgFor,NgClass,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }
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
  ngOnInit(): void { }

}
