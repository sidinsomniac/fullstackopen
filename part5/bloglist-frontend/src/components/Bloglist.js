import React from 'react';
import Blog from './Blog';

const Bloglist = ({ user, blogs, handleLogout, }) => (
  <>
    <p>{user.name} has logged in <button onClick={handleLogout}>logout</button></p>

    {
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
  </>
);

export default Bloglist;