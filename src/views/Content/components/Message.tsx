import { DateTime } from "luxon";
import styled from "styled-components";
import { Post } from "../../../redux/reducers/posts";
import { FC } from "react";

export const Message: FC<{ post: Post }> = ({ post }) => {
  return (
    <StyledMessage>
      <div>
        {DateTime.fromISO(post.created_time).toFormat("MMM dd, yyyy HH:mm:ss")}
      </div>
      <div>{post.message}</div>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  background-color: antiquewhite;
  border-radius: 6px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  div {
    padding: 8px;
  }
`;
