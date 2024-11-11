import { Link } from "react-router-dom";
import styled from "styled-components";

const Tag = styled.span`
  border: 1px solid ${(props) => props.theme.accent};
  margin-right: 3px;
  padding: 0 5px;
  border-radius: 5px;
`;

const Tags = ({ tags }) => {
  return tags.map((tag) => (
    <Tag key={tag.id}>
      <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
    </Tag>
  ));
};

export default Tags;
