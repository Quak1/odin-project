import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

import { getUserPost } from "../utils";
import PostForm from "../components/PostForm";

const EditPost = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!user) navigate("/login");
    else getUserPost(postId, user).then((data) => setPost(data ? data : null));
  }, [user, navigate, postId]);

  const fetchConfig = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  console.log({ post });
  return !post ? (
    "Loading..."
  ) : (
    <PostForm
      apiUrl={`posts/${postId}`}
      fetchConfig={fetchConfig}
      callback={() => navigate("/")}
      post={post}
    />
  );
};

export default EditPost;
