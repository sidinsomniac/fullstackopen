import React, { useRef, useState } from "react";
import Togglable from "./Togglable";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ postBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const blogFormRef = useRef();

  const addBlog = async event => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = { title, author, url };
    await postBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Togglable buttonLabel={"New Blog"} ref={blogFormRef}>
      <Form id="blog-form" onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>
            Title
          </Form.Label>
          <Form.Control type="text" id="blog-title"
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Author
          </Form.Label>
          <Form.Control type="text" id="blog-author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Url
          </Form.Label>
          <Form.Control type="text" id="blog-url"
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </Form.Group>
        <Button variant="success" type="submit">
          Create Blog
        </Button>
      </Form>
    </Togglable>
  );
};

export default BlogForm;