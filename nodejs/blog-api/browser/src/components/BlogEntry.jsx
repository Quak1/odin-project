import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import styled from "styled-components";
dayjs.extend(relativeTime);

const formatDate = (dateString) => dayjs(dateString).fromNow();

const Container = styled.article`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 5px;

  &:nth-child(odd) {
    background-color: ${(props) => props.theme.gray};
  }
`;

const BlogInfo = styled.div`
  display: inline-block;
  padding: 5px 10px;
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

const Thumbnail = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Tag = styled.span`
  border: 1px solid ${(props) => props.theme.accent};
  margin-right: 3px;
  padding: 0 5px;
  border-radius: 5px;
`;

const BlogEntry = ({ entry }) => {
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
      <BlogInfo>
        <h2>
          <Link to={`/posts/${entry.id}`}>{entry.title}</Link>
        </h2>
        <p>
          by {entry.user.username} •{" "}
          {isUpdated
            ? `${createdAt} (updated on ${updatedAt})`
            : `${createdAt}`}
        </p>
        <p>
          <span>
            {commentCount} {commentCount === 1 ? "comment" : "comments"}
          </span>
          <span>
            {" | "}
            {entry.tags.map((tag) => (
              <Tag key={tag.id}>
                <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
              </Tag>
            ))}
          </span>
        </p>
      </BlogInfo>
    </Container>
  );
};

BlogEntry.propTypes = {
  entry: PropTypes.exact({
    id: PropTypes.string,
    title: PropTypes.string,
    headerPicture: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
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
};

export default BlogEntry;
