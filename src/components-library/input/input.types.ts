export type Props = {
  id: string;
  label?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (args: { value: string }) => void;
};
