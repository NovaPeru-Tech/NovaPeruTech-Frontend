export class Metric {
  private _labels: string[];
  private _values: number[];
  private _metricType: string;
  private _total: number;

  constructor(metric: { labels: string[], values: number[], metricType: string, total: number }) {
    this._labels = metric.labels;
    this._values = metric.values;
    this._metricType = metric.metricType;
    this._total = metric.total;
  }

  get labels(): string[] {
    return this._labels;
  }

  set labels(value: string[]) {
    this._labels = value;
  }

  get values(): number[] {
    return this._values;
  }

  set values(value: number[]) {
    this._values = value;
  }

  get metricType(): string {
    return this._metricType;
  }

  set metricType(value: string) {
    this._metricType = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }
}
