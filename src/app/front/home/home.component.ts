import { Component } from '@angular/core';
import { environment } from '../../../environment/environment';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 ngOnInit() {
   console.log(environment.webApi)
   console.log(environment.production ? 'Production' : '開發中')
  }
}
