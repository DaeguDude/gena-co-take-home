"use client";

import { ChartType } from "@/app/api/charts/type";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

import { useMemo } from "react";

type ChartTypeOption = { label: string; value: ChartType; disabled?: boolean };

export function ChartTypeSelect({
  value,
  supportedChartTypes,
  onSelect,
}: {
  value?: ChartType;
  supportedChartTypes?: ChartType[];
  onSelect?: (type: ChartType) => void;
}) {
  const handleChange = (type: ChartType) => {
    if (onSelect) onSelect(type);
  };

  const displayOptions = useMemo(() => {
    let options: ChartTypeOption[] = [
      { label: "Bar", value: "bar" },
      { label: "Line", value: "line" },
      { label: "Number", value: "number" },
    ];

    options = options.map((option) => {
      const disabled = !supportedChartTypes?.includes(option.value);
      return {
        ...option,
        disabled,
      };
    });

    return options;
  }, [supportedChartTypes]);

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {displayOptions.map((option) => (
            <SelectItem
              key={option.label}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
