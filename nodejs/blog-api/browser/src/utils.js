const KEY = "userInfo";

const setUserInfo = (id, username, token) => {
  localStorage.setItem(KEY, JSON.stringify({ id, username, token }));
};

const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(KEY));
};

const clearUserInfo = () => {
  localStorage.removeItem(KEY);
};

export { getUserInfo, setUserInfo, clearUserInfo };
