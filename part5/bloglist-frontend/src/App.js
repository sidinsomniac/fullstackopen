import React, { useState, useEffect } from 'react';
import BlogForm from "./components/BlogForm";
import Bloglist from "./components/Bloglist";
import LoginForm from "./components/LoginForm";
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const fetchBlogs = () => {
    blogService.getAll().then(blogs => {
      console.log(blogs);
      setBlogs(blogs);
    }
    );
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
      setUser(currentUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    setUsername('');
    setPassword('');
  };


  return (
    <div>
      <h2>Blogs</h2>

      {
        !user ?
          <LoginForm username={username} password={password} handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} />
          : <>
            <Bloglist blogs={blogs} user={user} handleLogout={handleLogout} />
            <BlogForm fetchBlogs={fetchBlogs} />
          </>
      }

    </div>
  );
};

export default App;