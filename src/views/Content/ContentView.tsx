import { FC, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPosts, Post } from "../../redux/reducers/posts";

import styled from "styled-components";
import { sortByName } from "./utils/sortByName";
import { sortByDate } from "./utils/sortByDate";
import { Message } from "./components/Message";
import { SenderName } from "./components/SenderName";
import { useSearchParams } from "react-router-dom";

export type PostsByName = { [key: string]: Post[] };

export const ContentView: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams({});

  const posts = useAppSelector((state) => state.posts);
  const [page, setPage] = useState(1);

  const [reverseOrder, setReverse] = useState<boolean>(
    searchParams.get("reverse") === "true"
  );
  const [searchName, setSearchName] = useState<string | null>(
    searchParams.get("searchName") || null
  );
  const [searchContent, setSearchContent] = useState<string | null>(
    searchParams.get("searchContent") || null
  );
  const [selected, setSelected] = useState<string | null>(
    searchParams.get("selected") || null
  );

  const [postsByName, setPostsByName] = useState<PostsByName>(
    {} as PostsByName
  );

  useEffect(() => {
    // @ts-ignore
    setSearchParams({
      reverse: reverseOrder || "",
      selected: selected || "",
      searchName: searchName || "",
      searchContent: searchContent || "",
    });
  }, [reverseOrder, selected, searchName, searchContent]);

  useEffect(() => {
    if (page !== posts.data.page && posts.loading === "idle") {
      dispatch(fetchPosts({ page }));
    }
  }, [page, posts.data, dispatch]);

  useEffect(() => {
    const grouped = posts.data.posts.reduce(
      (byName: PostsByName, post: Post) => {
        if (!byName[post.from_name]) {
          byName[post.from_name] = [];
        }
        byName[post.from_name].push(post);
        return byName;
      },
      {} as PostsByName
    );
    setPostsByName(grouped);
  }, [posts]);

  const displayedNames = useMemo(
    () =>
      sortByName(Object.keys(postsByName)).filter((name) =>
        searchName
          ? name.toUpperCase().includes(searchName.toUpperCase())
          : true
      ),
    [postsByName, searchName]
  );

  const displayedMessages = useMemo(
    () =>
      sortByDate(posts.data.posts, reverseOrder)
        .filter((post) =>
          searchContent
            ? post.message.toUpperCase().includes(searchContent.toUpperCase())
            : true
        )

        .filter((post) => (selected ? post.from_id === selected : true)),
    [posts, reverseOrder, searchContent, selected]
  );

  return (
    <>
      <Navigation>
        <input
          type="text"
          onChange={(e) => setSearchName(e.target.value)}
          placeholder={"Search senders"}
          defaultValue={searchName || ""}
        />
        <div>
          <strong style={{ padding: "0 16px" }}>Page:</strong>
          <button onClick={() => setPage(page - 1)}>-</button>
          <strong style={{ padding: "0 16px" }}>{page}</strong>
          <button onClick={() => setPage(page + 1)}>+</button>
        </div>
        <div>
          <strong style={{ padding: "0 16px" }}>Order:</strong>
          <button
            disabled={!reverseOrder}
            onClick={() => setReverse(!reverseOrder)}
          >
            New First
          </button>
          <button
            disabled={reverseOrder}
            onClick={() => setReverse(!reverseOrder)}
          >
            Old First
          </button>
        </div>
        <div>
          <strong style={{ padding: "0 16px" }}>Search In Messages:</strong>
          <input
            type="text"
            onChange={(e) => setSearchContent(e.target.value)}
            defaultValue={searchContent || ""}
          />
        </div>
      </Navigation>
      <Content>
        <Names>
          {displayedNames.map((name, index) => (
            <SenderName
              key={name}
              selected={selected}
              onClick={setSelected}
              postsByName={postsByName}
              name={name}
            />
          ))}
        </Names>
        <Messages>
          {displayedMessages.map((post) => (
            <Message key={post.id} post={post} />
          ))}
        </Messages>
      </Content>
    </>
  );
};
const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const Names = styled.div`
  padding: 16px;
  min-width: 250px;
  overflow: hidden;
  div {
    padding: 4px 16px;
    cursor: pointer;
    &:hover {
      background-color: #eaeaea;
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
