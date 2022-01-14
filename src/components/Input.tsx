import { classNames } from '../utils/classNames';

interface Props {
  name: string;
  label: string;
  disabled: boolean;
  value?: any;
  type: string;
  placeholder?: string;
  className: string;
  icon: JSX.Element;
  error?: any;
  onChange?: any;
  onInput?: any;
  pattern?: string;
}

const baseClassNames =
  'relative shadow-sm bg-gray-700 text-gray-300 px-2 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xl text-xl border-gray-300 rounded-md z-0';

export const Input = ({
  name,
  label,
  disabled,
  value,
  type,
  placeholder,
  className,
  icon,
  error,
  onChange,
  pattern,
  onInput,
}: Props) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-md font-medium text-gray-200">
        {label}
      </label>
      <div className="mt-1 relative">
        <input
          type="text"
          name={name}
          disabled={disabled}
          id={name}
          value={value}
          inputMode="decimal"
          className={classNames(
            disabled ? 'cursor-not-allowed' : '',
            baseClassNames,
          )}
          placeholder={placeholder}
          onChange={onInput}
        />
        {icon}
      </div>
      <p className="mt-2 text-sm text-red-600">{error}</p>
    </div>
  );
};
