import { MetricResource, MetricsResponse } from './metrics-response';
import { Metric } from '../domain/model/metric.entity';

export class MetricAssembler {
  toEntitiesFromResponse(response: MetricsResponse): Metric[] {
    return response.metric.map(metric => this.toEntityFromResource(metric));
  }

  toEntityFromResource(resource: MetricResource): Metric {
    return new Metric({
      labels: resource.labels,
      values: resource.values,
      metricType: resource.metricType,
      total: resource.total
    });
  }

  toResourceFromEntity(entity: Metric): MetricResource {
    return {
      labels: entity.labels,
      values: entity.values,
      metricType: entity.metricType,
      total: entity.total
    } as MetricResource;
  }
}
