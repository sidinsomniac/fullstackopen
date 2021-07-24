import React from "react";
import { Link } from "react-router-dom";


const Bloglist = ({ blogs }) => (
  <>
    {
      blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      // <Blog deleteBlog={deleteBlog} updateBlog={updateBlog} user={user} blog={blog} />
      (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )
      )
    }
  </>
);

export default Bloglist;