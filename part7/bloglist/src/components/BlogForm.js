import React, { useRef } from "react";
import Togglable from "./Togglable";
import { Form, Button } from "react-bootstrap";
import { useField } from "../services/hooks";

const BlogForm = ({ postBlog }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const blogFormRef = useRef();

  const addBlog = async event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = { title: title.value, author: author.value, url: url.value };
    await postBlog(newBlog);
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <Togglable buttonLabel={"New Blog"} ref={blogFormRef}>
      <Form id="blog-form" onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>
            Title
          </Form.Label>
          <Form.Control id="blog-title" {...title} reset="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Author
          </Form.Label>
          <Form.Control id="blog-author"
            {...author} reset="" />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Url
          </Form.Label>
          <Form.Control id="blog-url"
            {...url} reset="" />
        </Form.Group>
        <Button variant="success" type="submit">
          Create Blog
        </Button>
      </Form>
    </Togglable>
  );
};

export default BlogForm;