import { Injectable } from '@angular/core';
import { ProductivityTimer } from './productivity-timer';
import { PomodoroTimer } from '../pomodoro'; // Import the PomodoroTimer if needed

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
