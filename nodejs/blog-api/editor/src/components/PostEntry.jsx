import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";

import Tags from "./Tags";

const formatDate = (dateString) => dayjs(dateString).format("YYYY-MM-DD");

const Container = styled.article`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.white};
  padding: 5px 10px;
`;

const Thumbnail = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Interior = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PostInfo = styled.div`
  font-size: 14px;

  a {
    text-decoration: none;
  }
  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
`;

const Action = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  font-family: inherit;
  background-color: ${(props) => props.theme.accent};
  border-radius: 5px;
  padding: 2px 5px;
  text-decoration: none;
  transition: transform 0.05s;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    outline: 1px solid black;
  }
`;

const PostEntry = ({ entry, onDelete, handleTogglePublication }) => {
  const commentCount = entry._count.comments;
  const createdAt = formatDate(entry.createdAt);
  const updatedAt = formatDate(entry.updatedAt);
  const isUpdated = entry.createdAt !== entry.updatedAt;
  if (!entry.headerPicture) entry.headerPicture = "https://placehold.co/120x80";

  return (
    <Container>
      <Thumbnail>
        <img src={entry.headerPicture} alt="" />
      </Thumbnail>
      <Interior>
        <PostInfo>
          <h2>{entry.title}</h2>
          <p>
            {isUpdated
              ? `Created: ${createdAt} (last updated: ${updatedAt})`
              : `Created: ${createdAt}`}
          </p>
          <p>Comments: {commentCount}</p>
          <p>
            Tags: <Tags tags={entry.tags} />
          </p>
        </PostInfo>
        <Actions>
          <Action as="button" onClick={handleTogglePublication}>
            {entry.published ? "Unpublish" : "Publish"}
          </Action>
          <Action to={`/editor/${entry.id}`}>Edit</Action>
          <Action as="button" onClick={onDelete}>
            Delete
          </Action>
        </Actions>
      </Interior>
    </Container>
  );
};

PostEntry.propTypes = {
  entry: PropTypes.exact({
    id: PropTypes.string,
    userId: PropTypes.string,
    title: PropTypes.string,
    headerPicture: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    published: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    _count: PropTypes.exact({ comments: PropTypes.number }),
    user: PropTypes.exact({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  }),
  onDelete: PropTypes.func,
  handleTogglePublication: PropTypes.func,
};

export default PostEntry;
