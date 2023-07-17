import { FC } from "react";

interface InputProps {
  palceholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Input: FC<InputProps> = ({
  palceholder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      placeholder={palceholder}
      disabled={disabled}
      value={value}
      type={type}
      onChange={onChange}
      className="
     w-full
     p-4
      text-lg bg-black border-2 border-neutral-800 rounded-none text-white
     focus:border-2 transition disabled:bg-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed
    "
    />
  );
};
