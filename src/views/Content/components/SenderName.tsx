import { PostsByName } from "../ContentView";
import { FC } from "react";
import styled from "styled-components";

export const SenderName: FC<{
  selected: string | null;
  onClick: (id: string | null) => void;
  postsByName: PostsByName;
  name: string;
}> = ({ selected, postsByName, name, onClick }) => {
  const isSelected = selected === postsByName[name][0].from_id;
  return (
    <StyledSenderName
      style={{
        backgroundColor: isSelected ? "#eaeaea" : "",
      }}
      onClick={() => onClick(postsByName[name][0].from_id)}
    >
      {!!isSelected && (
        <Close
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick(null);
          }}
        >
          X
        </Close>
      )}
      {name} <Number>{postsByName[name].length}</Number>
    </StyledSenderName>
  );
};

const StyledSenderName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Number = styled.span`
  color: white;
  display: flex;
  flex-direction: row;
  background-color: #07a;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  width: 30px;
  border-radius: 10px;
`;

const Close = styled.span`
  color: white;
  display: flex;
  flex-direction: row;
  background-color: #aa0028;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  width: 30px;
  border-radius: 10px;
`;
