import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import CreateBlog from "./CreateBlog";

test("create a new blog", () => {
  const mockHandler = jest.fn();

  const component = render(<CreateBlog addBlog={mockHandler} />);

  const form = component.container.querySelector("form");
  expect(form).toBeDefined();
  expect(form).toBeVisible();

  const title = component.container.querySelector("#title");
  expect(title).toBeDefined();
  expect(title).toBeVisible();
  userEvent.type(title, "test title");

  const author = component.container.querySelector("#author");
  expect(author).toBeDefined();
  expect(author).toBeVisible();
  userEvent.type(author, "test author");

  const url = component.container.querySelector("#url");
  expect(url).toBeDefined();
  expect(url).toBeVisible();
  userEvent.type(url, "test url");

  const button = component.getByText("create");
  userEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0].title).toBe("test title");
  expect(mockHandler.mock.calls[0][0].author).toBe("test author");
  expect(mockHandler.mock.calls[0][0].url).toBe("test url");
});
