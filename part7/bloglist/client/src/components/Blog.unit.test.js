import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Component testing is done with react-testing-library",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  likes: 10,
};

test("default blog view, shows only title & author", () => {
  const component = render(<Blog blog={blog} />);

  const blogTitle = component.container.querySelector(".blogTitle");
  expect(blogTitle).toBeDefined();
  expect(blogTitle).toBeVisible();
  expect(blogTitle).toHaveTextContent(`${blog.title} by ${blog.author}`);
});

test("on clicking view button, url & likes are shown", () => {
  const component = render(<Blog blog={blog} />);

  const buttonView = component.getByText("view");
  userEvent.click(buttonView);

  const blogAll = component.container.querySelector(".blogAll");
  expect(blogAll).toBeVisible();
  expect(blogAll).toHaveTextContent(`${blog.url}`);
  expect(blogAll).toHaveTextContent(`${blog.likes}`);
});

test("two click on like button will increase two likes", async () => {
  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} handleLikeChange={mockHandler} />);

  const buttonView = component.getByText("view");
  userEvent.click(buttonView);

  const blogAll = component.container.querySelector(".blogAll");
  expect(blogAll).toBeVisible();

  const buttonLike = component.getByText("like");
  userEvent.click(buttonLike);
  userEvent.click(buttonLike);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
