import { IComment } from "../types/ITask";

export const countCommentIds = (comments: IComment[]): Record<string, number> => {
  const countMap: Record<string, number> = {};

  const countComments = (comments: IComment[]): void => {
    for (const comment of comments) {
      if (comment.commentId) {
        countMap[comment.commentId] = (countMap[comment.commentId] || 0) + 1;
      }
      if (comment.children.length > 0) {
        countComments(comment.children);
      }
    }
  };

  countComments(comments);

  return countMap;
};