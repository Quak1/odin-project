import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import SButton from "./SubmitButton";
import { API_URL } from "../utils";

const Error = styled.label`
  color: red;
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.main};
  font-weight: bold;
  font-size: 18px;

  &[for="published"] {
    display: inline-block;
  }
`;

const Form = styled.form`
  width: 100%;

  div {
    margin: 10px 0;
    width: 100%;
  }

  input,
  textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.gray};
    font-size: inherit;
  }

  textarea {
    resize: vertical;
    font-family: inherit;
  }

  input[type="checkbox"] {
    width: auto;
  }
`;

const SubmitButton = styled(SButton)`
  margin: 0;
`;

const PostForm = ({ callback, apiUrl, fetchConfig, post }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      published: post && post.published,
    },
  });

  async function onSubmit(formData) {
    formData.tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length !== 0);

    try {
      const res = await fetch(`${API_URL}/${apiUrl}`, {
        ...fetchConfig,
        body: JSON.stringify(formData),
        headers: { ...fetchConfig.headers, "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        if (typeof data.errors === "string") {
          setError("root", { type: "custom", message: data.errors });
          reset({ password: "", passwordConfirm: "" }, { keepErrors: true });
        } else
          Object.entries(data.errors).forEach(([key, value]) => {
            setError(key, { type: "custom", message: value });
          });
      } else {
        callback(data);
      }
    } catch (error) {
      setError("content", { type: "custom", message: error.message });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <Error>{errors.root.message}</Error>}
      <div>
        <Label htmlFor="title">Title</Label>
        <input
          id="title"
          type="text"
          defaultValue={post && post.title}
          {...register("title", { required: "Title is required." })}
        />
        {errors.title && <Error htmlFor="title">{errors.title.message}</Error>}
      </div>
      <div>
        <Label htmlFor="headerPicture">Header picture url</Label>
        <input
          id="headerPicture"
          type="text"
          defaultValue={post && post.headerPicture}
          {...register("headerPicture")}
        />
        {errors.headerPicture && (
          <Error htmlFor="headerPicture">{errors.headerPicture.message}</Error>
        )}
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma separated list)</Label>
        <input
          id="tags"
          type="text"
          defaultValue={post && post.tags.map((tag) => tag.name)}
          {...register("tags", { required: "Tags is required." })}
        />
        {errors.tags && <Error htmlFor="tags">{errors.tags.message}</Error>}
      </div>
      <div>
        <Label htmlFor="content">Content</Label>
        <textarea
          id="content"
          type="text"
          defaultValue={post && post.content}
          rows="15"
          {...register("content", { required: "Content is required." })}
        />
        {errors.content && (
          <Error htmlFor="content">{errors.content.message}</Error>
        )}
      </div>
      <div>
        <Label htmlFor="published">Publish?</Label>
        <input id="published" type="checkbox" {...register("published")} />
        {errors.published && (
          <Error htmlFor="published">{errors.published.message}</Error>
        )}
      </div>
      <SubmitButton type="submit">Save post</SubmitButton>
    </Form>
  );
};

PostForm.propTypes = {
  apiUrl: PropTypes.string.isRequired,
  callback: PropTypes.func,
  fetchConfig: PropTypes.shape({
    method: PropTypes.string,
    headers: PropTypes.shape({ Authorization: PropTypes.string }),
  }).isRequired,
  post: PropTypes.exact({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
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
    comments: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        postId: PropTypes.string,
        content: PropTypes.string,
        createdAt: PropTypes.string,
        user: PropTypes.exact({
          id: PropTypes.string,
          username: PropTypes.string,
        }),
      }),
    ),
    user: PropTypes.exact({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  }),
};

export default PostForm;
