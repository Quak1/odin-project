import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const CommentBox = ({ postId }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.log(data);
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}/comments`;
      const res = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
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
};

export default CommentBox;
