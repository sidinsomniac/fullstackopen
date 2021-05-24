import React, { useState, useEffect } from 'react';
import BlogForm from "./components/BlogForm";
import Bloglist from "./components/Bloglist";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const getAndSetError = message => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  const getAndSetSuccess = message => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  const fetchBlogs = () => {
    blogService.getAll().then(blogs => {
      console.log(blogs);
      setBlogs(blogs);
    }
    );
  };

  const postBlog = async newBlog => {
    try {
      const { title, author } = newBlog;
      const response = await blogService.createBlog(newBlog);
      getAndSetSuccess(`${title} by ${author} added`);
      await fetchBlogs();
      console.log(response);
    } catch (exception) {
      const { response } = exception;
      getAndSetError(`${response.statusText}: ${response.data.error}`);
      console.log(exception);
    }
  };

  const updateBlog = async (updatedBlog, blogId) => {
    try {
      const { title, author } = updatedBlog;
      const response = await blogService.updateBlog(blogId, updatedBlog);
      getAndSetSuccess(`${title} by ${author} updated`);
      await fetchBlogs();
      console.log(response);
    } catch (exception) {
      const { response } = exception;
      getAndSetError(`${response.statusText}: ${response.data.error}`);
      console.log(exception);
    }
  };

  const deleteBlog = async id => {
    try {
      await blogService.removeBlog(id);
      getAndSetSuccess('Blog removed successfully!');
      await fetchBlogs();
    } catch (exception) {
      const { response } = exception;
      getAndSetError(`${response.statusText}: ${response.data.error}`);
      console.log(exception);
    }
  };

  useEffect(fetchBlogs, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const currentUser = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(currentUser));
      getAndSetSuccess(`Logged in ${currentUser.name} successfully`);
      blogService.setToken(currentUser.token);
      setUser(currentUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      const { response } = exception;
      getAndSetError(`${response.statusText}: ${response.data.error}`);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogAppUser");
      getAndSetSuccess(`Logged out successfully`);
      setUser(null);
      setUsername('');
      setPassword('');
    } catch (exception) {
      getAndSetError("Some error occured in logging user out");
    }
  };


  return (
    <div>
      {successMessage && <Notification message={successMessage} typeOfClass={"success"} />}
      {errorMessage && <Notification message={errorMessage} typeOfClass={"error"} />}
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