import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import type { MetricTemplate } from "@/types/sports";

interface MetricInputProps {
  metric: MetricTemplate;
  value: number | boolean | undefined;
  onChange: (key: string, value: number | boolean) => void;
}

export function MetricInput({ metric, value, onChange }: MetricInputProps) {
  const handleChange = (newValue: number | boolean) => {
    onChange(metric.metric_key, newValue);
  };

  if (metric.data_type === "boolean") {
    return (
      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
        <div className="space-y-0.5">
          <Label className="text-sm font-medium">{metric.metric_name}</Label>
          {metric.description && (
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          )}
        </div>
        <Switch
          checked={typeof value === "boolean" ? value : false}
          onCheckedChange={(checked) => handleChange(checked)}
        />
      </div>
    );
  }

  if (metric.data_type === "score" && metric.min_value !== null && metric.max_value !== null) {
    const numValue = typeof value === "number" ? value : metric.min_value ?? 1;
    return (
      <div className="p-3 bg-muted/50 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">{metric.metric_name}</Label>
            {metric.description && (
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            )}
          </div>
          <div className="text-lg font-semibold text-primary min-w-[3rem] text-right">
            {numValue}/{metric.max_value}
          </div>
        </div>
        <Slider
          value={[numValue]}
          min={metric.min_value ?? 1}
          max={metric.max_value ?? 10}
          step={1}
          onValueChange={([val]) => handleChange(val)}
          className="w-full"
        />
      </div>
    );
  }

  // Default: number/percentage/time input
  return (
    <div className="p-3 bg-muted/50 rounded-xl space-y-2">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-sm font-medium">{metric.metric_name}</Label>
          {metric.description && (
            <p className="text-xs text-muted-foreground">{metric.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={typeof value === "number" ? value : ""}
          min={metric.min_value ?? undefined}
          max={metric.max_value ?? undefined}
          placeholder={`${metric.min_value ?? 0} - ${metric.max_value ?? "∞"}`}
          onChange={(e) => handleChange(parseFloat(e.target.value) || 0)}
          className="h-10"
        />
        {metric.unit && (
          <span className="text-sm text-muted-foreground min-w-[3rem]">
            {metric.unit}
          </span>
        )}
      </div>
    </div>
  );
}

interface MetricFormProps {
  metrics: MetricTemplate[];
  values: Record<string, number | boolean>;
  onChange: (values: Record<string, number | boolean>) => void;
}

export function MetricForm({ metrics, values, onChange }: MetricFormProps) {
  const handleMetricChange = (key: string, value: number | boolean) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {metrics.map((metric) => (
        <MetricInput
          key={metric.id}
          metric={metric}
          value={values[metric.metric_key]}
          onChange={handleMetricChange}
        />
      ))}
    </div>
  );
}
