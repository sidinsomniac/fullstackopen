import React from "react";
import Blog from "./Blog";

const Bloglist = ({ user, blogs, updateBlog, deleteBlog }) => (
  <>
    {
      blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog deleteBlog={deleteBlog} updateBlog={updateBlog} user={user} key={blog.id} blog={blog} />
      )
    }
  </>
);

export default Bloglist;