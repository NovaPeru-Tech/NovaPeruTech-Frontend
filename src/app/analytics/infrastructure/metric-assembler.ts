import { MetricResource } from './metrics-response';
import { Metric } from '../domain/model/metric.entity';

export class MetricAssembler {
  toEntityFromResource(resource: MetricResource): Metric {
    return new Metric({
      labels: resource.labels,
      values: resource.values,
      metricType: resource.metricType,
      total: resource.total
    });
  }
}
