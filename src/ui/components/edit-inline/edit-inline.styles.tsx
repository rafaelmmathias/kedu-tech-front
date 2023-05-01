import styled from "styled-components";

export const LabelContainer = styled.div`
  cursor: text;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  word-break: break-all;
  padding: 0 5px;
  margin-left: -5px;
  transition: all 0.3s;
  border-radius: 6px;
  > * {
    margin: 0 !important;
  }
  :hover {
    background-color: ${({ theme }) => theme.colorBgLayout};

    > span {
      visibility: visible;
    }
  }
`;
