import { Component, inject, signal, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { formatDuration, intervalToDuration } from 'date-fns';

@Component({
  imports: [MatButtonModule, MatSnackBarModule, MatTooltipModule],
  selector: 'app-landing-page',
  styleUrl: './landing-page.scss',
  templateUrl: './landing-page.html',
})
export class LandingPage implements OnInit {
  protected readonly currentYear = new Date().getFullYear();
  private _snackBar = inject(MatSnackBar);
  private daysElapsed: String = '';

  horizontalPosition = signal<MatSnackBarHorizontalPosition>('center');
  verticalPosition = signal<MatSnackBarVerticalPosition>('top');

  ngOnInit() {
    this.open();
    const startDate = new Date('18 June 2019');
    const duration = intervalToDuration({
      start: startDate, // a Date
      end: new Date(),
    });

    this.daysElapsed = formatDuration(duration, {
      format: ['years', 'months', 'days'],
    });
  }

  open() {
    this._snackBar.open('No AI was used/harmed while making this website!!', 'Ok', {
      horizontalPosition: this.horizontalPosition(),
      verticalPosition: this.verticalPosition(),
      duration: 5000,
    });
  }
}
