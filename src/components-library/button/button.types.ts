import { FormEvent } from "react";

export type Props = {
  id: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
};
