const listHelper = require("../utils/list_helper");

const listWithOneBlog = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
];

const listWithMultipleBlogs = [
    {
        _id: "5a422aa71b54a676234d17e6",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        _id: "5g345e3d1f322g219y1547f7",
        title: "Go To Neutral Statements",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Neutrals.html",
        likes: 22,
    },
    {
        _id: "e173e3d1f323g216645dxj9",
        title: "To Kill A Mockingbird",
        author: "Harper Lee",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/To_Kill_A_Mockingbird.html",
        likes: 23,
    },
    {
        _id: "3a6g2ba71b54a676234d47f9",
        title: "The Gift of Magi",
        author: "Hector Hugh Munroe",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/The_Gift_Of_Magi.html",
        likes: 34,
    }
];

describe("total likes", () => {

    test("when list has only one blog, equals the likes of that", () => {
        const totalLikes = listHelper.totalLikes(listWithOneBlog);
        expect(totalLikes).toBe(5);
    });

    test("when list has only more than one blog, equals the likes of total likes", () => {
        const totalLikes = listHelper.totalLikes(listWithMultipleBlogs);
        expect(totalLikes).toBe(84);
    });
});

describe("most liked blog", () => {
    test("when multiple blogs are entered", () => {
        const favouriteBlog = listHelper.favouriteBlog(listWithMultipleBlogs);
        expect(favouriteBlog).toEqual({
            _id: "3a6g2ba71b54a676234d47f9",
            title: "The Gift of Magi",
            author: "Hector Hugh Munroe",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/The_Gift_Of_Magi.html",
            likes: 34,
        });
    });
});

describe("author with", () => {
    test("the most written blogs", () => {
        const mostBlogs = listHelper.mostBlogs(listWithMultipleBlogs);
        expect(mostBlogs).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 2
        });
    });

    test("the most liked blogs", () => {
        const mostLikes = listHelper.mostLikes(listWithMultipleBlogs);
        expect(mostLikes).toEqual({
            author: "Hector Hugh Munroe",
            likes: 34
        });
    });
});

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});