export interface QuantityInputProps {
  quantity?: number;
  onUpdateQuantity: (quantity: number) => void;
}

export async function QuantityInput({
  quantity = 0,
  onUpdateQuantity,
}: QuantityInputProps) {
  return (
    <div className="border border-gray-400 rounded-3xl px-1 flex items-center justify-center w-full max-w-[4em]">
      <button
        className="text-lg px-0.5 font-semibold disabled:text-gray-300"
        type="submit"
        onClick={(e) => {
          onUpdateQuantity(quantity - 1);
        }}
        disabled={quantity === 1}
      >
        -
      </button>
      <input
        className="[appearance:textfield] w-full focus:outline-none text-center font-light"
        type="number"
        value={quantity}
        readOnly
      />

      <button
        className="text-lg px-0.5 font-semibold disabled:text-gray-300"
        type="submit"
        onClick={(e) => {
          onUpdateQuantity(quantity + 1);
        }}
      >
        +
      </button>
    </div>
  );
}
