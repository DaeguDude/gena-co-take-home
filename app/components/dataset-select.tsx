"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

import { DatasetMetadata } from "../api/data/type";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "@/lib/constant";

export function DatasetSelect({
  value,
  onSelect,
}: {
  value?: DatasetMetadata;
  onSelect?: (data: DatasetMetadata) => void;
}) {
  const { data: datasetMetadataList } = useQuery({
    queryKey: ["dataset"],
    queryFn: async () => {
      const res = await fetch(`${baseUrl}/api/data`, {
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error(`사용가능한 데이터셋을 찾아오는데 실패`);
      }

      const data: DatasetMetadata[] = await res.json();
      return data;
    },
  });

  const handleValueChange = (endpoint: string) => {
    const found = datasetMetadataList?.find(
      (data) => data.endpoint === endpoint
    );
    if (found && onSelect) {
      onSelect(found);
    }
  };

  const displayData = datasetMetadataList ?? [];

  return (
    <Select value={value?.endpoint} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a dataset" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {displayData.map((data) => (
            <SelectItem key={data.name} value={data.endpoint}>
              {data.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
