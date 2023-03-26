import styled from "styled-components";

import { VideoTile } from "../VideoTile";

export const ContentTile = styled(VideoTile)`
  background-color: ${({ theme }) => theme.colors.greys.grey80};
`;