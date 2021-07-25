import React, { useRef, useState } from "react";
import Togglable from "./Togglable";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { BiCommentDetail } from "react-icons/bi";

const CommentForm = ({ blogId, postComment }) => {

  const [comment, setComment] = useState("");

  const blogFormRef = useRef();

  const addComment = async event => {
    event.preventDefault();
    console.log({ comment, blogId });
    const newComment = {
      text: comment
    };
    await postComment(blogId, newComment);
    blogFormRef.current.toggleVisibility();
    setComment("");
  };

  return (
    <Togglable buttonLabel={"add comment"} ref={blogFormRef}>
      <Form id="blog-form" onSubmit={addComment}>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} id="blog-title"
            value={comment}
            onChange={({ target }) => setComment(target.value)} />
        </Form.Group>
        <Button variant="info" type="submit">Comment <BiCommentDetail />
        </Button>
      </Form>
    </Togglable>
  );
};

export default CommentForm;