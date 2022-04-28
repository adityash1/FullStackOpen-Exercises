import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks";

const AddComment = ({ blog }) => {
  const comment = useField("text");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, { comment: comment.value }));
    dispatch(setNotification(`a new comment added to ${blog.title}`));
    comment.reset();
  };

  return (
    <div>
      <form onSubmit={() => handleSubmit(event)}>
        <input {...comment} />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default AddComment;
