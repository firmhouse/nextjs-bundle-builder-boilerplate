"use client";
import Image from "next/image";
import { useCallback } from "react";
export interface QuantityInputProps {
  quantity?: number;
  onUpdateQuantity: (quantity: number) => void;
}

export async function QuantityInput({
  quantity = 0,
  onUpdateQuantity,
}: QuantityInputProps) {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onUpdateQuantity(parseInt(event.target.value, 10));
    },
    [onUpdateQuantity]
  );
  return (
    <div className="relative">
      <select
        defaultValue={quantity}
        className="w-24 h-[50px] border rounded-full pt-3 pb-4 px-4 bg-transparent appearance-none bg-white"
        onChange={onChange}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <option className="px-4 py-1" key={i+1} value={i+1}>
            {i + 1}
          </option>
        ))}
      </select>
      <Image
        src="/dropdown-chevron.svg"
        alt="chevron-down"
        width={12}
        height={12}
        className="absolute top-[21px] right-[21px] pointer-events-none"
      />
    </div>
  );
}
