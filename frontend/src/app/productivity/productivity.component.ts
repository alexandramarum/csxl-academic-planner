import { Component } from '@angular/core';
import { TimerWidget } from './widgets/timer-widget.widget';
import { ProductivityService } from './productivity.service';

@Component({
  selector: 'app-productivity',
  templateUrl: './productivity.component.html',
  styleUrls: ['./productivity.component.css']
})
export class ProductivityComponent {
  get timerCount(): number {
    return ProductivityService.timerCount;
  }

  get timers() {
    return ProductivityService.timers;
  }

  public static Route = {
    path: 'productivity',
    title: 'Productivity',
    component: ProductivityComponent
  };
}
