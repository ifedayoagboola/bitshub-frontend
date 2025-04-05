import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-sale-timer',
    imports: [CommonModule, TranslateModule],
    templateUrl: './sale-timer.component.html',
    styleUrl: './sale-timer.component.scss'
})
export class SaleTimerComponent {

  @Input() startDate: string | null;
  @Input() endDate: string | null;
  @Input() title: string | null;

  public remainingTime: any = null;
  private timerInterval: any; // Store the interval reference

  ngOnInit() {
    this.startTimer();
  }

  ngOnChanges() {
    this.startTimer(); // Re-start timer if inputs change
  }

  ngOnDestroy() {
    this.stopTimer(); // Clear interval on component destruction
  }

  private startTimer() {
    if (this.startDate && this.endDate) {
      const startDateTime = new Date(this.startDate).getTime();
      const endDateTime = new Date(this.endDate).getTime();
      const now = new Date().getTime();

      // if (now > startDateTime && endDateTime > now) {
        this.updateTimer(); // Initial call to display the remaining time immediately.

        // Update the timer every second
        this.timerInterval = setInterval(() => {
          this.updateTimer();
        }, 1000);
      // }
    }
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private updateTimer() {
    if (this.startDate && this.endDate) {
      const startDateTime = new Date(this.startDate).getTime();
      const endDateTime = new Date(this.endDate).getTime();
      const now = new Date().getTime();

      let targetDate = endDateTime; // Assume the target date is the end date

      if (now < startDateTime) {
        targetDate = startDateTime;
      } else if (now >= endDateTime) {
        this.remainingTime = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
        this.stopTimer(); // Stop timer if end date is reached
        return;
      }

      this.calculateTimeDifference(targetDate);
    }
  }

  private calculateTimeDifference(targetDate: number) {
    const now = new Date().getTime();
    const timeDiff = targetDate - now;

    this.remainingTime = {
      days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDiff % (1000 * 60)) / 1000)
    };

  }

}
