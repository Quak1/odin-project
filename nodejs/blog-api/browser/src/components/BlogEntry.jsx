import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const formatDate = (dateString) => dayjs(dateString).fromNow();

const BlogEntry = ({ entry }) => {
  const commentCount = entry._count.comments;
  const createdAt = formatDate(entry.createdAt);
  const updatedAt = formatDate(entry.updatedAt);
  const isUpdated = entry.createdAt !== entry.updatedAt;

  return (
    <div>
      <div>
        <img src={entry.headerPicture} alt="" />
      </div>
      <div>
        <p>
          <Link to={`/posts/${entry.id}`}>{entry.title}</Link>
        </p>
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
            {" "}
            | tags:
            {entry.tags.map((tag) => (
              <Link to={`/tags/${tag.name}`} key={tag.id}>
                {tag.name}
              </Link>
            ))}
          </span>
        </p>
      </div>
    </div>
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
