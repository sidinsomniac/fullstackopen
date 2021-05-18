import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log(blogs);
      setBlogs(blogs);
    }
    );
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const currentUser = await loginService.login({ username, password });
      setUser(currentUser);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log(exception);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          Username
            <input type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password
            <input type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const blogList = () => {
    return (<>
      <p>{user.name} has logged in</p>;
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
    </>);
  };



  return (
    <div>
      <h2>Blogs</h2>

      {!user ? loginForm() : blogList()}


    </div>
  );
};

export default App;