import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";


const Bloglist = ({ blogs }) => (
  <>
    <h2>Blogs</h2>
    <ListGroup variant="flush" className="mb-3">
      {
        blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        (
          <div key={blog.id}>
            <ListGroup.Item>
              <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            </ListGroup.Item>
          </div>
        )
        )
      }
    </ListGroup>
  </>
);

export default Bloglist;