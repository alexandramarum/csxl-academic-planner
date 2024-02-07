import { Injectable } from '@angular/core';
import { PomodoroTimer } from '../pomodoro';
import { ProductivityTimer } from './productivity-timer';

@Injectable({
  providedIn: 'root'
})
export class ProductivityService {
  static timerCount: number = 0;
  static timers: ProductivityTimer[] = [];
  constructor() {}

  public addTimer(
    name: string,
    description: string,
    workLength: number,
    breakLength: number
  ): void {
    let newTime = new ProductivityTimer(
      workLength,
      breakLength,
      name,
      description
    );
    ProductivityService.timers.push(newTime);
  }
}
