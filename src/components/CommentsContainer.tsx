import "@/styles/comment.scss";

import { IComment, ITask } from "../types/ITask";
import React, { FormEvent } from "react";

import Comment from "./Comment";
import { Dispatch } from "redux";
import { addNewComment } from "../core/actionCreators/tasksActionCreators";
import { connect } from "react-redux";
import useHandleFields from "../hooks/useHandleFields";

interface StateProps {
  id: string;
  comments: IComment[];
}

interface DispatchProps {
  addComment(comment: CommentForm): void;
}

type CommentForm = Pick<ITask, "id"> & Omit<IComment, "commentId" | "children">;

type Props = StateProps & DispatchProps;

const CommentsContainer: React.FC<Props> = ({ id, comments, addComment }) => {
  const date = new Date(Date.now()).toLocaleString();

  const [fields, handleFieldChange] = useHandleFields<CommentForm>({
    id: id,
    text: "",
    creation_date: date,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fields) return;

    addComment(fields);

    fields.creation_date = date;
  };

  return (
    <div className="form-comments-container">
      <form
        className="add-comments-form"
        action="submit"
        onSubmit={handleSubmit}
      >
        <input
          name="text"
          placeholder="Type comment"
          type="text"
          value={fields.text}
          onChange={handleFieldChange}
        />
        <button
          className="add-btn"
          disabled={!fields.text.length}
          type="submit"
        >
          Send comment
        </button>
      </form>
      <div className="comments-container">
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment key={comment.commentId} taskId={id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addComment: (comment: CommentForm) => dispatch(addNewComment(comment)),
});

export default connect(null, mapDispatchToProps)(CommentsContainer);
