import { Injectable, signal } from '@angular/core';
import { AnalyticsApi } from '../infrastructure/analytics-api';
import { Metric } from '../domain/model/metric.entity';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsStore {
  // Signals separados para cada métrica
  private readonly _staffTerminationsSignal = signal<Metric | null>(null);
  private readonly _staffHiresSignal = signal<Metric | null>(null);
  private readonly _residentsAdmissionsSignal = signal<Metric | null>(null);
  private readonly _residentsActiveSignal = signal<Metric | null>(null);

  private readonly _loadingSignal = signal<boolean>(false);
  private readonly _errorSignal = signal<string | null>(null);

  // Readonly signals públicos
  readonly staffTerminations = this._staffTerminationsSignal.asReadonly();
  readonly staffHires = this._staffHiresSignal.asReadonly();
  readonly residentsAdmissions = this._residentsAdmissionsSignal.asReadonly();
  readonly residentsActive = this._residentsActiveSignal.asReadonly();
  readonly loading = this._loadingSignal.asReadonly();
  readonly error = this._errorSignal.asReadonly();

  constructor(private analyticsApi: AnalyticsApi) {}

  getStaffTerminations(nursingHomeId: number, year: number) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.analyticsApi.getStaffTerminations(nursingHomeId, year).pipe(retry(2)).subscribe({
      next: metric => {
        this._staffTerminationsSignal.set(metric);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to fetch staff terminations'));
        this._loadingSignal.set(false);
      }
    });
  }

  getStaffHires(nursingHomeId: number, year: number) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.analyticsApi.getStaffHires(nursingHomeId, year).pipe(retry(2)).subscribe({
      next: metric => {
        this._staffHiresSignal.set(metric);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to fetch staff hires'));
        this._loadingSignal.set(false);
      }
    });
  }

  getResidentsAdmissions(nursingHomeId: number, year: number) {
    this._loadingSignal.set(true);
    this._errorSignal.set(null);

    this.analyticsApi.getResidentsAdmissions(nursingHomeId, year).pipe(retry(2)).subscribe({
      next: metric => {
        this._residentsAdmissionsSignal.set(metric);
        this._loadingSignal.set(false);
      },
      error: err => {
        this._errorSignal.set(this.formatError(err, 'Failed to fetch residents admissions'));
        this._loadingSignal.set(false);
      }
    });
  }

  resetMetrics() {
    this._staffTerminationsSignal.set(null);
    this._staffHiresSignal.set(null);
    this._residentsAdmissionsSignal.set(null);
    this._residentsActiveSignal.set(null);
    this._errorSignal.set(null);
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not Found` : error.message;
    }
    return fallback;
  }
}
