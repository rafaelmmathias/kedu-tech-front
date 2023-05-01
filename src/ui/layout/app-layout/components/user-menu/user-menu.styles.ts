import { Avatar } from "kedu-tech-ui";
import styled from "styled-components";

export const UserAvatar = styled(Avatar)`
  background-color: ${({ theme }) => theme.colorPrimary};
  vertical-align: "middle";
  cursor: pointer;
`;
