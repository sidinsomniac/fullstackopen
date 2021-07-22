import React, { useState, useEffect } from "react";
import BlogForm from "./components/BlogForm";
import Bloglist from "./components/Bloglist";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage, getAndSetError, getAndSetSuccess } from "./reducers/notificationReducers";
import { fetchAndSetBlogs } from "./reducers/blogsReducer";
import { removeUser, setUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const blogs = useSelector(state => state.blogs);
  const notification = useSelector(state => state.notification);

  const fetchBlogs = () => {
    dispatch(fetchAndSetBlogs());
  };

  const postBlog = async newBlog => {
    try {
      const { title, author } = newBlog;
      const response = await blogService.createBlog(newBlog);
      showNotification("SUCCESS", `${title} by ${author} added`);
      await fetchBlogs();
      console.log(response);
    } catch (exception) {
      const { response } = exception;
      showNotification("FAILURE", `${response.statusText}: ${response.data.error}`);
      console.log(exception);
    }
  };

  const updateBlog = async (updatedBlog, blogId) => {
    try {
      const { title, author } = updatedBlog;
      const response = await blogService.updateBlog(blogId, updatedBlog);
      showNotification("SUCCESS", `${title} by ${author} updated`);
      await fetchBlogs();
      console.log(response);
    } catch (exception) {
      const { response } = exception;
      showNotification("FAILURE", `${response.statusText}: ${response.data.error}`);
      console.log(exception);
    }
  };

  const deleteBlog = async id => {
    try {
      await blogService.removeBlog(id);
      showNotification("SUCCESS", "Blog removed successfully!");
      await fetchBlogs();
    } catch (exception) {
      const { response } = exception;
      showNotification("FAILURE", `${response.statusText}: ${response.data.error}`);
      console.log(exception);
    }
  };

  useEffect(fetchBlogs, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const currentUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(currentUser));
      showNotification("SUCCESS", `Logged in ${currentUser.name} successfully`);
      blogService.setToken(currentUser.token);
      dispatch(setUser(currentUser));
      setUsername("");
      setPassword("");
    } catch (exception) {
      const { response } = exception;
      showNotification("FAILURE", `${response.statusText}: ${response.data.error}`);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      showNotification("SUCCESS", "Logged out successfully");
      dispatch(removeUser());
      setUsername("");
      setPassword("");
    } catch (exception) {
      showNotification("FAILURE", "Some error occured in logging user out");
    }
  };


  const showNotification = (type, text, timeout = 4000) => {
    type === "SUCCESS" ?
      dispatch(getAndSetSuccess(text)) :
      dispatch(getAndSetError(text));
    dispatch(clearMessage(timeout));
  };


  return (
    <div>
      {notification.successMessage && <Notification message={notification.successMessage} typeOfClass={"success"} />}
      {notification.errorMessage && <Notification message={notification.errorMessage} typeOfClass={"error"} />}
      <h2>Blogs</h2>

      {
        !user ?
          <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
          : <>
            <Bloglist updateBlog={updateBlog} deleteBlog={deleteBlog} blogs={blogs} user={user} handleLogout={handleLogout} />
            <BlogForm postBlog={postBlog} />
          </>
      }

    </div>
  );
};

export default App;