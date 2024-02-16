import { Injectable } from '@angular/core';
import { ProductivityTimer } from './productivity-timer';

@Injectable({
  providedIn: 'root'
})
export class ProductivityService {
  static defaultTimer = new ProductivityTimer(
    0,
    0,
    'default',
    'this is a default timer.'
  );
  static timers: ProductivityTimer[] = [ProductivityService.defaultTimer];
  static timerCount: number = ProductivityService.timers.length;

  constructor() {}

  public addTimer(
    name: string,
    description: string,
    workLength: number,
    breakLength: number
  ): void {
    /* Creates new timer object from input value and adds it to the 
    list of timers in productivity service. Increments timerCount.*/
    let newTime = new ProductivityTimer(
      workLength * 60,
      breakLength * 60,
      name,
      description
    );
    ProductivityService.timers.push(newTime);
    ProductivityService.timerCount++;
  }

  public changeTimer(
    index: number,
    name: string,
    description: string,
    workLength: number,
    breakLength: number
  ): void {
    /* Creates new timer object from input value and adds it to the 
    list of timers at given index in productivity service. */
    if (index >= 0 && index < ProductivityService.timers.length) {
      // Check if the index is valid
      const updatedTimer = new ProductivityTimer(
        workLength * 60,
        breakLength * 60,
        name,
        description
      );

      // Replace the timer at the specified index
      ProductivityService.timers[index] = updatedTimer;
    }
  }
}
