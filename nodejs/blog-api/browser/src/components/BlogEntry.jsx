import PropTypes from "prop-types";

const BlogEntry = ({ entry }) => {
  const commentCount = entry._count.comments;
  const isUpdated = entry.createdAt !== entry.updatedAt;

  return (
    <div>
      <div>
        <img src={entry.headerPicture} alt="" />
      </div>
      <div>
        <p>{entry.title}</p>
        <p>
          by {entry.user.username} •{" "}
          {isUpdated
            ? `${entry.createdAt} (updated on ${entry.updatedAt})`
            : `${entry.createdAt}`}
        </p>
        <p>
          <span>
            {commentCount} {commentCount === 1 ? "comment" : "comments"}
          </span>
          <span>
            {" "}
            | tags:
            {entry.tags.map((tag) => (
              <a href={tag.id} key={tag.id}>
                {tag.name}
              </a>
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
