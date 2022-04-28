import AddComment from "./AddComment";

const Comment = ({ comment }) => <li>{comment}</li>;

const CommentForm = ({ blog }) => {
    const FormStyle = {
        paddingBottom: 10,
    }

    const commentStyle = {
        paddingLeft: 40,
    }

  return (
    <div>
      <div style={FormStyle}>
        <AddComment blog={blog} />
      </div>
      <div style={commentStyle}>
        {blog.comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentForm;
