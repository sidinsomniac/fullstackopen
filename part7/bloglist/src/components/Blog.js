import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { BiLike } from "react-icons/bi";


const Blog = ({ updateBlog, deleteBlog, postComment }) => {


  const id = useParams().id;
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id));
  const user = useSelector(state => state.user);
  const history = useHistory();

  if (!blog) return null;

  const updateLikes = async () => {
    const { likes, id: blogId, user: { _id: userId } } = blog;
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
      user: userId
    };
    await updateBlog(updatedBlog, blogId);
  };

  const removeBlog = async () => {
    const { id, title, author } = blog;
    if (window.confirm(`Remove blog ${title} by ${author}?`)) {
      await deleteBlog(id);
      history.push("/");
    }
  };

  console.log(blog);

  return (
    <Container>
      <Card className="blog mt-5">
        <Card.Body>
          <Row>
            <Col>
              <h1>{blog.title} {user.username === blog.user.username && <Button onClick={removeBlog} variant="outline-danger"><MdDeleteForever /></Button>}</h1>
              <a href={"http://" + blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
              <p className="likes">
                <Button onClick={updateLikes} variant="outline-primary" className="like-button"><BiLike /></Button>{" "}
                <span>{blog.likes}</span>
              </p>
              <em className="text-muted">added by {blog.user.name}</em>
            </Col>
            <Col>
              <h3>Comments</h3>
              <CommentForm blogId={blog.id} postComment={postComment} />
              <Card className="mt-3 p-3">
                {blog.comments.map(comment => {
                  return (
                    <Card key={comment.id} className="mb-3">
                      <Card.Body>{comment.text}</Card.Body>
                    </Card>
                  );
                })}
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Blog;