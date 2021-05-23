import React from 'react';
import Blog from './Blog';

const Bloglist = ({ user, blogs, handleLogout, updateBlog }) => (
  <>
    <p>{user.name} has logged in <button onClick={handleLogout}>logout</button></p>

    {
      blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog updateBlog={updateBlog} key={blog.id} blog={blog} />
      )
    }
  </>
);

export default Bloglist;