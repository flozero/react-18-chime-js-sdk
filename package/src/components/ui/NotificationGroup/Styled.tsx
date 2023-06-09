import styled from "styled-components";

export const StyledNotificationGroup = styled.div`
  position: fixed;
  top: 2rem;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: ${(props) => props.theme.zIndex.notificationGroup};
  pointer-events: none;
`;
