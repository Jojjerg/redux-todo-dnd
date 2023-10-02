import { IComment, ITask } from "../types/ITask";

export const addComment = (
  originalArray: ITask[],
  taskId: string,
  commentId: string,
  comment: IComment
) => {
  const foundedTask = originalArray.find((task) => task.id === taskId);

  if (!foundedTask) return originalArray;

  const foundedComment = getTopics(commentId, foundedTask.comments);
  foundedComment.children.push(comment);

  return originalArray;
}

const getTopics = (id: string, node: IComment[]) => {
  const reduce = [].reduce;
  const runner = (result: unknown | null, node: any): any => {
    if (result || !node) return result;
    return (
      (node.commentId === id && node) ||
      runner(null, node.children) ||
      reduce.call(Object(node), runner, result)
    );
  }
  return runner(null, node);
}