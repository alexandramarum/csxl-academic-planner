import { Component } from '@angular/core';

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.css']
})
export class ProductivityComponent {
  public static Route = {
    path: 'productivity',
    component: ProductivityComponent
  };
}
