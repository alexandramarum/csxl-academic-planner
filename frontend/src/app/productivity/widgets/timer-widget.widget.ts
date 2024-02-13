import { Component, Input } from '@angular/core';
import { ProductivityService } from '../productivity.service';
import { ProductivityTimer } from '../productivity-timer';
import { PomodoroTimer } from 'src/app/pomodoro';

@Component({
  selector: 'timer-widget',
  templateUrl: './timer-widget.widget.html',
  styleUrls: ['./timer-widget.widget.css']
})
export class TimerWidget {
  @Input() timer!: ProductivityTimer;
  public startOrResume: string = 'start';
  public minutes: number = 0;

  constructor(productivityService: ProductivityService) {}

  public startTimer(timer: ProductivityTimer): void {
    // if timer was idle and is idle, start timer turns grey
    if (timer.state == 0 && timer.previousState == 0) {
      this.startOrResume = 'start';
      this.timer.start();
    }
    // if timer is idle and was not previously idle, display resume and then turns grey.
    else if (timer.state == 0 && timer.previousState != 0) {
      this.startOrResume = 'resume';
      this.timer.resume();
      // turn grey
    }
  }

  public pauseTimer(timer: ProductivityTimer) {
    this.startOrResume = 'resume';
    this.timer.pause();
    // turn grey
  }

  public resetTimer(timer: ProductivityTimer): void {
    this.startOrResume = 'start';
    this.timer.reset();
  }

  public getIndex(timer: ProductivityTimer): number {
    return ProductivityService.timers.indexOf(timer);
  }
}
