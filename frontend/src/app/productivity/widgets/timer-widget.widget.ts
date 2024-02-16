import { Component, Input } from '@angular/core';
import { ProductivityService } from '../productivity.service';
import { ProductivityTimer } from '../productivity-timer';
import { PomodoroTimer } from 'src/app/pomodoro';
import { count } from 'rxjs';

@Component({
  selector: 'timer-widget',
  templateUrl: './timer-widget.widget.html',
  styleUrls: ['./timer-widget.widget.css']
})
export class TimerWidget {
  @Input() timer!: ProductivityTimer;
  public startOrResume: string = 'start';
  public minutes: number = 0;
  public notificationSound: HTMLAudioElement;

  constructor(productivityService: ProductivityService) {
    this.notificationSound = new Audio();
    this.notificationSound.src = 'assets/notification.mp3';
  }

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
    }
    // check if countdown is 0
    timer.countdown$.subscribe((countdownValue: number) => {
      if (countdownValue === 0) {
        // play audio
        this.notificationSound.play();
      }
    });
  }

  public pauseTimer(timer: ProductivityTimer) {
    // Takes in ProductivityTimer, sets start/resume button to resume, pauses timer.
    this.startOrResume = 'resume';
    this.timer.pause();
  }

  public resetTimer(timer: ProductivityTimer): void {
    // Takes in ProductivityTimer, sets start/resume button to start, resets timer count and state.
    this.startOrResume = 'start';
    this.timer.reset();
  }

  public getIndex(timer: ProductivityTimer): number {
    // Given a ProductivityTimer, returns its index in timers.
    return ProductivityService.timers.indexOf(timer);
  }

  public removeTimer(timer: ProductivityTimer): void {
    // Given a ProductivityTimer, identifies index in timers and removes it.
    ProductivityService.timers.splice(
      ProductivityService.timers.indexOf(timer),
      1
    );

    // Decrements timerCount.
    ProductivityService.timerCount = ProductivityService.timers.length;
  }

  public timerType(timer: ProductivityTimer): string {
    // Returns if a given timer is the work timer or break timer, regardless of idle state.
    if (timer.state == 1) {
      return 'Work Time: ';
    } else if (timer.state == 2) {
      return 'Break Time: ';
    } else if (timer.previousState == 1) {
      return 'Work Time: ';
    } else if (timer.previousState == 2) {
      return 'Break Time: ';
    } else {
      return 'Work Time: ';
    }
  }

  formatTime(seconds: number | null): string {
    // Formats a number representing seconds and returns a string representing mins and secs.
    if (seconds === null || isNaN(seconds)) {
      return '';
    }
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    // if seconds is less than 10, adds a 0 before seconds.
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
