import styled from "styled-components";

import Svg from "../Svg";
import { MicrophoneProps } from ".";

const SvgWithoutMicrophoneProps = ({
	poorConnection,
	muted,
	...rest
}: MicrophoneProps) => <Svg {...rest} />;

export const StyledSvg = styled(SvgWithoutMicrophoneProps)<MicrophoneProps>`
  ${(props) =>
		props.poorConnection ? `color: ${props.theme.colors.error.light}` : ""}
`;
