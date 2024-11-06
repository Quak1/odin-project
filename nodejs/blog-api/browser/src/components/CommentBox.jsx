import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";

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
      const api = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments`;
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
      <label htmlFor="content">Comment:</label>
      <textarea
        id="content"
        {...register("content", {
          required: "Comment content is required.",
          maxLength: {
            value: 300,
            message: "Comment max length: 300 characters.",
          },
        })}
      ></textarea>
      {errors.content && <p>{errors.content.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

CommentBox.propTypes = {
  postId: PropTypes.string,
  addComment: PropTypes.func,
};

export default CommentBox;
