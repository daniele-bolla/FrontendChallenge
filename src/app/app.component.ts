import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';

import { FormsModule } from '@angular/forms';
import { FitTextDirective } from './fit-text.directive';

import { Subscription, interval } from 'rxjs';
import { LocalStorageService } from '../services/localStorageService';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/London');

const getNextDays = (currentDate = new Date(), daysToAdd = 1) => {
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + daysToAdd);
  return nextDate;
};
@Component({
  selector: 'app-root',
  standalone: true,
  providers: [provideNativeDateAdapter(), LocalStorageService],
  imports: [
    FitTextDirective,
    RouterOutlet,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  eventName = 'Time to Midsummer Eve';
  eventDate = '2025-06-21';
  now = getNextDays();
  countdown: { days: number; hours: number; minutes: number; seconds: number } =
    {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  formattedCountdown = '';
  private subscription: Subscription | undefined;

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  updateEventName() {
    this.localStorageService.setItem('eventName', this.eventName);
  }

  updateEventDate() {
    this.localStorageService.setItem(
      'eventDate',
      new Date(this.eventDate).toISOString()
    );
  }

  startCountdown(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = interval(1000).subscribe(() => {
      this.countdown = this.calculateCountdown(this.eventDate);
      this.formattedCountdown = this.formatCountdown(this.countdown);
    });
  }

  private loadFromLocalStorage(): void {
    const storedEventName =
      this.localStorageService.getItem<string>('eventName');
    const storedDate = this.localStorageService.getItem<string>('eventDate');

    if (storedEventName) {
      this.eventName = storedEventName;
    }
    if (storedDate) {
      this.eventDate = storedDate;
    }
  }

  private calculateCountdown(endDate: string): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } {
    const now = dayjs();
    const duration = dayjs.duration(dayjs(endDate).diff(now));
    return {
      days: dayjs(endDate).diff(now, 'days'),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }

  formatCountdown(countdown: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }): string {
    return `${countdown.days} days, ${countdown.hours} h, ${countdown.minutes}m, ${countdown.seconds}s`;
  }
}
