import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

export const Card: FC<PropsWithChildren> = styled.div`
  background-color: white;
  box-shadow: #000 8px 8px;
  border-radius: 4px;
`;
