import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

export const SpinningIcon = styled(LoadingOutlined)`
  font-size: 207px;
  position: absolute;
  top: -77px;
  left: -19px;
  color: ${({ theme }) => theme.colorPrimary};
`;
