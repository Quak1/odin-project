const KEY = "userInfo";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const setUserInfo = (id, username, token) => {
  localStorage.setItem(KEY, JSON.stringify({ id, username, token }));
};

const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(KEY));
};

const clearUserInfo = () => {
  localStorage.removeItem(KEY);
};

const getUserPosts = async (user) => {
  try {
    const url = `${API_URL}/users/${user.id}/posts`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

const deletePost = async (postId, user) => {
  try {
    const url = `${API_URL}/posts/${postId}`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

const getUserPost = async (postId, user) => {
  try {
    const url = `${API_URL}/posts/${postId}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return await res.json();
  } catch (e) {
    console.log(e);
  }
};

export {
  getUserInfo,
  setUserInfo,
  clearUserInfo,
  API_URL,
  getUserPosts,
  getUserPost,
  deletePost,
};
