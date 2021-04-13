export type Props = {
  id: string;
  label?: string;
  className?: string;
  placeholder?: string;
  list?: ReadonlyArray<{ id: string; label: string }>;
  value?: string;
  onChange?: (args: { value: string }) => void;
};
