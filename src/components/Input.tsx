import styled from "styled-components";
import { FC, HTMLInputTypeAttribute } from "react";

export const Input: FC<{
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
  required?: boolean;
}> = ({ type, name, label, required }) => {
  return (
    <StyledInput>
      <label>
        <span>{label}</span>
        <input type={type} name={name} required={required} />
      </label>
    </StyledInput>
  );
};

const StyledInput = styled.div`
  label {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
  }
  span {
    font-size: 12px;
  }
  input {
    box-sizing: border-box;
    padding: 4px 8px;
    width: 100%;
  }
`;
