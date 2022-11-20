import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

export const Card: FC<PropsWithChildren> = ({ children }) => (
  <StyledCard>{children}</StyledCard>
);

const StyledCard = styled.div`
  background-color: white;
  box-shadow: #000 8px 8px;
  border-radius: 4px;
`;
