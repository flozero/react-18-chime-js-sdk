import { StyledName } from "./Styled";

export interface RosterNameProps {
  name: string;
  subtitle?: string;
}

export const RosterName = ({ name, subtitle }: RosterNameProps) => (
	<StyledName>
		<div className="ch-name">{name}</div>
		{subtitle && <div className="ch-subtitle">{subtitle}</div>}
	</StyledName>
);
