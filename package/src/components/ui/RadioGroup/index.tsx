import { ChangeEvent, InputHTMLAttributes } from "react";
import { Radio } from "../Radio";

interface RadioProps {
  label: string;
  value: string;
  icon?: JSX.Element;
  inputProps?: InputHTMLAttributes<HTMLButtonElement>;
  /* Unique identifier to target element */
  testId?: string;
}

export interface RadioGroupProps {
  /** The callback fired when the state is changed. */
  onChange(event: ChangeEvent): void;
  /** Options of radio group. */
  options: RadioProps[];
  /** The selected option. */
  value: string;
}

export const RadioGroup = (props: RadioGroupProps) => {
	const { options, value, onChange } = props;
	return (
		<>
			{options.map((option: any, index: number) => {
				return (
					<Radio
						value={option.value}
						key={`${option}-${index}`}
						label={option.label}
						checked={option.value === value}
						icon={option.icon}
						onChange={onChange}
						testId={option.testId}
						{...option.inputProps}
					/>
				);
			})}
		</>
	);
};

RadioGroup.displayName = "RadioGroup";
