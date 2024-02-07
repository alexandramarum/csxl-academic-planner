import { PomodoroTimer } from '../pomodoro';

export class ProductivityTimer extends PomodoroTimer {
  name: string;
  description: string;

  constructor(
    timerLength: number,
    breakLength: number,
    name: string,
    description: string
  ) {
    super(timerLength, breakLength);
    this.name = name;
    this.description = description;
  }
}
