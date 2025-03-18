import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { Ng2FittextModule } from "ng2-fittext";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import { Subscription, interval } from 'rxjs';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(duration);
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault()

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ng2FittextModule, FormsModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {

  title = 'Time to Midsummer Eve'
  date = '2025-06-21'
  countdown: { days: number; hours: number; minutes: number; seconds: number } = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private subscription: Subscription | undefined;

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startCountdown(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = interval(1000).subscribe(() => {
      this.countdown = this.calculateCountdown(this.date);
    });
  }

  private calculateCountdown(endDate: string): { days: number; hours: number; minutes: number; seconds: number } {
    const now = dayjs();
    const duration = dayjs.duration(dayjs(endDate).diff(now));
    return {
      days: dayjs(endDate).diff(now,'days'),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }

  formatCountdown(countdown: { days: number; hours: number; minutes: number; seconds: number }): string {
    return `${countdown.days} days, ${countdown.hours} h, ${countdown.minutes}m, ${countdown.seconds}s`;
  }
}


function intervalToDuration(arg0: { start: Date; end: Date; }) {
  throw new Error('Function not implemented.');
}

