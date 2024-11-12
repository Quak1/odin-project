import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import PostForm from "../components/PostForm";

const NewPost = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const fetchConfig = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
    method: "POST",
  };

  return (
    <PostForm
      apiUrl="posts"
      fetchConfig={fetchConfig}
      callback={() => navigate("/")}
    />
  );
};

export default NewPost;
