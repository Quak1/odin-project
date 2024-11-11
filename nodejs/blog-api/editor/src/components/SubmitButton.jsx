import styled from "styled-components";

const SubmitButton = styled.button`
  display: block;
  margin-right: 0;
  margin-left: auto;
  background-color: ${(props) => props.theme.accent};
  color: ${(props) => props.theme.black};
  border-radius: 5px;
  padding: 5px 10px;
  font-size: inherit;
  border: none;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`;

export default SubmitButton;
