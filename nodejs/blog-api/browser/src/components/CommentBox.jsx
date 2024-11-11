import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

import { API_URL } from "../config/constant";
import styled from "styled-components";
import SubmitButton from "./SubmitButton";

const TextArea = styled.textarea`
  box-sizing: border-box;
  font-family: inherit;
  width: 100%;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.gray};
  padding: 10px 15px;
  font-size: 16px;
  resize: vertical;
  margin-bottom: 5px;
`;

const Errors = styled.div`
  color: red;
  p {
    margin: 0;
  }
`;

const CommentBox = ({ postId, addComment }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useOutletContext();

  async function onSubmit(data) {
    if (!user)
      return setError("content", {
        type: "custom",
        message: "You need to log in.",
      });

    try {
      const api = `${API_URL}/posts/${postId}/comments`;
      const res = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (res.status === 401)
        setError("content", { type: "custom", message: "You need to log in." });
      else if (!res.ok) {
        const data = await res.json();
        if (typeof data.errors === "string")
          setError("content", { type: "custom", message: data.errors });
        else
          Object.entries(data.errors).forEach(([key, value]) =>
            setError(key, { type: "custom", message: value }),
          );
      } else {
        const comment = await res.json();
        addComment(comment);
        reset();
      }
    } catch (error) {
      setError("content", { type: "custom", message: error.message });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextArea
        id="content"
        placeholder="Make a comment!"
        {...register("content", {
          required: "Comment content is required.",
          maxLength: {
            value: 300,
            message: "Comment max length: 300 characters.",
          },
        })}
      ></TextArea>
      <Errors>{errors.content && <p>{errors.content.message}</p>}</Errors>
      <SubmitButton type="submit">Submit</SubmitButton>
    </form>
  );
};

CommentBox.propTypes = {
  postId: PropTypes.string,
  addComment: PropTypes.func,
};

export default CommentBox;
