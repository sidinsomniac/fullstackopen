import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog/>", () => {

    let component, blogContainer, deleteBlog, updateBlog, viewButton;

    beforeEach(() => {
        const user = {
            name: "Test User",
            username: "testuser",
            token: "qefgw9248yg2w9gqh2wg"
        };

        const blog = {
            title: "This is a test blog",
            author: "Test author",
            url: "www.testurl.com",
            likes: 49,
            id: "239gy913fkq83t755",
            user
        };


        deleteBlog = jest.fn();
        updateBlog = jest.fn();

        component = render(
            <Blog deleteBlog={deleteBlog} updateBlog={updateBlog} user={user} key={blog.id} blog={blog} />
        );

        blogContainer = component.container.querySelector(".blog");
        viewButton = component.container.querySelector(".toggle-button");

    });

    test("renders contracted blogs", () => {
        expect(blogContainer).toHaveTextContent("This is a test blog");
        expect(blogContainer).toHaveTextContent("Test author");
        expect(blogContainer).not.toHaveTextContent("www.testurl.com");
        expect(blogContainer).not.toHaveTextContent(49);
    });

    test("show url and likes when expanded", () => {
        fireEvent.click(viewButton);
        expect(blogContainer).toHaveTextContent("www.testurl.com");
        expect(blogContainer).toHaveTextContent(49);
    });

    test("updateBlog called twice if like button clicked twice", () => {
        fireEvent.click(viewButton);
        const likeButton = component.container.querySelector(".like-button");
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);
        expect(updateBlog.mock.calls).toHaveLength(2);
    });
});
