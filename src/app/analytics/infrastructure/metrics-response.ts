import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

export interface MetricResource extends BaseResource {
  labels: string[];
  values: number[];
  metricType: string;
  total: number;
}

export interface MetricsResponse extends BaseResponse {
  metric: MetricResource[];
}
