import styled from "styled-components";
import { baseSpacing, baseStyles } from "../Base";

export const StyledLabel = styled.label`
  color: ${(props) => props.theme.inputs.fontColor};
  font-size: ${(props) => props.theme.fontSizes.label.fontSize};
  line-height: ${(props) => props.theme.fontSizes.label.lineHeight};

  ${baseSpacing}
  ${baseStyles}
`;
