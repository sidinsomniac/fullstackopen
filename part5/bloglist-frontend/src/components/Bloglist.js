import React from 'react';
import Blog from './Blog';

const Bloglist = ({ user, blogs, handleLogout, updateBlog, deleteBlog }) => (
  <>
    <p>{user.name} has logged in <button onClick={handleLogout}>logout</button></p>

    {
      blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog deleteBlog={deleteBlog} updateBlog={updateBlog} user={user} key={blog.id} blog={blog} />
      )
    }
  </>
);

export default Bloglist;