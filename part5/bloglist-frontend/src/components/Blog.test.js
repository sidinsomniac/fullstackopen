import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog/>", () => {

    let component, blogContainer;

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


        const deleteBlog = jest.fn();
        const updateBlog = jest.fn();

        component = render(
            <Blog deleteBlog={deleteBlog} updateBlog={updateBlog} user={user} key={blog.id} blog={blog} />
        );

        blogContainer = component.container.querySelector(".blog");
    });

    test("renders contracted blogs", () => {
        expect(blogContainer).toHaveTextContent("This is a test blog");
        expect(blogContainer).toHaveTextContent("Test author");
        expect(blogContainer).not.toHaveTextContent("www.testurl.com");
        expect(blogContainer).not.toHaveTextContent(49);
    });

    test("show url and likes when expanded", () => {
        const viewButton = component.container.querySelector(".toggle-button");
        fireEvent.click(viewButton);
        expect(blogContainer).toHaveTextContent("www.testurl.com");
        expect(blogContainer).toHaveTextContent(49);
    });
});
