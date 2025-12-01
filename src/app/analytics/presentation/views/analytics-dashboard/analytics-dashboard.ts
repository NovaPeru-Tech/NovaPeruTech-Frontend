import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { LayoutNursingHome } from '../../../../shared/presentation/components/layout-nursing-home/layout-nursing-home';
import { AnalyticsStore } from '../../../application/analytics.store';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconButton } from '@angular/material/button';

interface MetricResponse {
  labels: string[];
  values: number[];
  metricType: string;
  total: number;
}

interface ExpandedChart {
  title: string;
  data: ChartConfiguration['data'];
  options: ChartConfiguration['options'];
  type: ChartType;
}

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [
    TranslatePipe,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatDivider,
    BaseChartDirective,
    LayoutNursingHome,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule,
    MatIcon,
    MatProgressSpinner,
    MatIconButton
  ],
  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css'
})
export class AnalyticsDashboard implements OnInit {
  protected store = inject(AnalyticsStore);

  selectedYear = new Date().getFullYear();
  nursingHomeId = 1; // Ajustar según tu lógica

  availableYears = [2023, 2024, 2025];

  // Control del modal de expansión
  expandedChart: ExpandedChart | null = null;

  ngOnInit() {
    this.loadAllMetrics();
  }

  onYearChange() {
    this.loadAllMetrics();
  }

  private loadAllMetrics() {
    // Cargar todas las métricas del año seleccionado
    this.store.getStaffTerminations(this.nursingHomeId, this.selectedYear);
    this.store.getStaffHires(this.nursingHomeId, this.selectedYear);
    this.store.getResidentsAdmissions(this.nursingHomeId, this.selectedYear);
    this.store.getResidentsActive(this.nursingHomeId, this.selectedYear);
  }

  // Getters para acceder a los datos del store
  get staffTerminationsMetric() {
    return this.store.staffTerminations();
  }

  get staffHiresMetric() {
    return this.store.staffHires();
  }

  get residentsAdmissionsMetric() {
    return this.store.residentsAdmissions();
  }

  get residentsActiveMetric() {
    return this.store.residentsActive();
  }

  get loading() {
    return this.store.loading();
  }

  get error() {
    return this.store.error();
  }

  // Helper methods para obtener datos reales
  private getMonthlyTerminations(): number[] {
    return this.staffTerminationsMetric?.values || Array(12).fill(0);
  }

  private getMonthlyHires(): number[] {
    return this.staffHiresMetric?.values || Array(12).fill(0);
  }

  private getMonthlyAdmissions(): number[] {
    return this.residentsAdmissionsMetric?.values || Array(12).fill(0);
  }

  private getMonthLabels(): string[] {
    // Usar labels del API si están disponibles, sino usar defaults
    return this.staffTerminationsMetric?.labels ||
      ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  // LINE CHART - Staff Terminations over time
  public lineTerminationsType: ChartType = 'line';
  public get lineTerminationsData(): ChartConfiguration<'line'>['data'] {
    const labels = this.getMonthLabels();
    const data = this.getMonthlyTerminations();
    return {
      labels,
      datasets: [
        {
          label: 'Terminations',
          data,
          fill: false,
          borderColor: '#ef5350',
          backgroundColor: '#ef5350',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  }

  public lineTerminationsOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Staff Terminations by Month', font: { size: 16 } }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  };

  // BAR CHART - Staff Hires vs Terminations (Stacked)
  public barComparisonType: ChartType = 'bar';
  public get barComparisonData(): ChartConfiguration<'bar'>['data'] {
    const labels = this.getMonthLabels();
    return {
      labels,
      datasets: [
        {
          label: 'Hires',
          data: this.getMonthlyHires(),
          backgroundColor: '#66bb6a',
          borderColor: '#66bb6a',
          borderWidth: 1
        },
        {
          label: 'Terminations',
          data: this.getMonthlyTerminations(),
          backgroundColor: '#ef5350',
          borderColor: '#ef5350',
          borderWidth: 1
        }
      ]
    };
  }

  public barComparisonOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: true, position: 'bottom' },
      title: { display: true, text: 'Staff Hires vs Terminations', font: { size: 16 } }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 2 } }
    }
  };

  // LINE CHART - Resident Admissions
  public lineAdmissionsType: ChartType = 'line';
  public get lineAdmissionsData(): ChartConfiguration<'line'>['data'] {
    const labels = this.getMonthLabels();
    const data = this.getMonthlyAdmissions();
    return {
      labels,
      datasets: [
        {
          label: 'Admissions',
          data,
          fill: true,
          borderColor: '#70b1e6',
          backgroundColor: 'rgba(112, 177, 230, 0.2)',
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    };
  }

  public lineAdmissionsOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Resident Admissions by Month', font: { size: 16 } }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 5 } }
    }
  };

  // DOUGHNUT CHART - Staff Distribution by Role
  public doughnutStaffType: ChartType = 'doughnut';
  public get doughnutStaffData(): ChartConfiguration<'doughnut'>['data'] {
    // Este chart requiere un endpoint diferente para distribución por rol
    // Por ahora mantener datos estáticos o comentar hasta tener el endpoint
    return {
      labels: ['Nurses', 'Caregivers', 'Doctors', 'Administrators', 'Supervisors'],
      datasets: [
        {
          data: [45, 30, 10, 8, 7],
          backgroundColor: [
            '#70b1e6',
            '#66bb6a',
            '#ffa726',
            '#ab47bc',
            '#26c6da'
          ],
          borderWidth: 2,
          borderColor: '#fff'
        }
      ]
    };
  }

  public doughnutStaffOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Staff Distribution by Role', font: { size: 16 } }
    }
  };

  // BAR CHART - Resident Admissions (Simple)
  public barAdmissionsType: ChartType = 'bar';
  public get barAdmissionsData(): ChartConfiguration<'bar'>['data'] {
    const labels = this.getMonthLabels();
    return {
      labels,
      datasets: [
        {
          label: 'Admissions',
          data: this.getMonthlyAdmissions(),
          backgroundColor: '#66B3AD',
          borderColor: '#66B3AD',
          borderWidth: 1
        }
      ]
    };
  }

  public barAdmissionsOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Monthly Resident Admissions', font: { size: 16 } }
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 5 } }
    }
  };

  // PIE CHART - Active Residents Status
  public pieActiveType: ChartType = 'pie';
  public get pieActiveData(): ChartConfiguration<'pie'>['data'] {
    const activeData = this.residentsActiveMetric;

    if (activeData && activeData.labels && activeData.values) {
      return {
        labels: activeData.labels,
        datasets: [
          {
            data: activeData.values,
            backgroundColor: ['#66bb6a', '#ffa726', '#ef5350'],
            borderWidth: 2,
            borderColor: '#fff'
          }
        ]
      };
    }

    // Fallback data
    return {
      labels: ['Active', 'Under Evaluation', 'Temporary Leave'],
      datasets: [
        {
          data: [85, 10, 5],
          backgroundColor: ['#66bb6a', '#ffa726', '#ef5350'],
          borderWidth: 2,
          borderColor: '#fff'
        }
      ]
    };
  }

  public pieActiveOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: true, text: 'Active Residents Status', font: { size: 16 } }
    }
  };

  // KPI Cards - Summary metrics usando datos reales
  get totalTerminations(): number {
    return this.staffTerminationsMetric?.total || 0;
  }

  get totalHires(): number {
    return this.staffHiresMetric?.total || 0;
  }

  get totalAdmissions(): number {
    return this.residentsAdmissionsMetric?.total || 0;
  }

  get netStaffChange(): number {
    return this.totalHires - this.totalTerminations;
  }

  get activeResidents(): number {
    return this.residentsActiveMetric?.total || 0;
  }

  // Métodos para expandir gráficos
  expandChart(title: string, data: ChartConfiguration['data'], options: ChartConfiguration['options'], type: ChartType) {
    this.expandedChart = { title, data, options, type };
  }

  closeExpandedChart() {
    this.expandedChart = null;
  }
}
