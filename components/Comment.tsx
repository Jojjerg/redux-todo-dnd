import React, { FormEvent, useEffect, useState } from "react";

import { Dispatch } from "redux";
import { IComment } from "../types/ITask";
import { checkInputsLength } from "../utils/checkInputsLength";
import { connect } from "react-redux";
import { convertDateToNormal } from "../utils/convertDateToNormal";
import { replyToComment } from "../core/actionCreators/tasksActionCreators";
import useHandleFields from "../hooks/useHandleFields";
import { users } from "../config/users";

interface StateProps {
  taskId: string;
  comment: IComment;
}

interface DispatchProps {
  replyComment(comment: CommentForm): void;
}

type CommentForm = {
  taskId: string;
  commentId: string;
  text: string;
  creation_date: string;
};

type Props = StateProps & DispatchProps;

const Comment: React.FC<Props> = ({ taskId, comment, replyComment }) => {
  const date = new Date(Date.now()).toLocaleString();

  const nestedComments = (comment.children || []).map((comment) => {
    return (
      <Comment
        key={comment.commentId}
        replyComment={replyComment}
        taskId={taskId}
        comment={comment}
      />
    );
  });

  const [fields, handleFieldChange] = useHandleFields<CommentForm>({
    taskId: taskId,
    commentId: comment.commentId,
    text: "",
    creation_date: date,
  });

  const [isAnswer, setisAnswer] = useState<boolean>(false);

  const handleClick = () => {
    setisAnswer((prev) => !prev);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    replyComment(fields);
    handleClick();
  };

  const [name, setName] = useState("")

  useEffect(() => {
    const getRandom = (items: string[]) => {
      setName(items[Math.floor(Math.random() * items.length)]);
    }
    getRandom(users)
  }, [])

  return (
    <div style={{ padding: "10px", borderLeft: "1px solid #4a4f50" }}>
      <div className="date comment-container">
        <p>{name}</p>
        <p className="comment-text">{comment.text}</p>
        <div className="comment-extra">
          <p>{convertDateToNormal(comment.creation_date)}</p>
          <button onClick={handleClick} className="answer">
            Reply
          </button>
        </div>
        {isAnswer ? (
          <div className="answer-form">
            <form action="submit" onSubmit={handleSubmit}>
              <input
                name="text"
                className="answer-input"
                type="text"
                value={fields.text}
                onChange={handleFieldChange}
              />
              <button
                disabled={!checkInputsLength(fields)}
                type="submit"
                className="add-btn answer-button"
              >
                Reply
              </button>
            </form>
          </div>
        ) : null}
      </div>
      {nestedComments}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  replyComment: (comment: CommentForm) => dispatch(replyToComment(comment)),
});

export default connect(null, mapDispatchToProps)(Comment);
