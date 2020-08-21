import { createState, createEffect } from "solid-js";
import { For } from "solid-js/dom";
import { useStore } from "./Store";
import './Comments.css';

 type Comment = {
   by: string,
   id: number,
   kids: number[],
   parent: number,
   text: string,
   time: number,
   type: string
 };

export const Comments = () => {
  const [state, setState] = createState({
    comments: []
  }),
    { getItems, getItem } = useStore();

  createEffect(async () => {
    const storyId = window.location.hash.split('/')[1];
    const story = await getItem(storyId);
    const comments = await getItems(story.kids, 0, 30);;
    setState({ comments });
  });

  function username(comment: Comment) {
    if (!comment.kids) {
      return <span class="username">{comment.by}</span>;
    }
    return (
      <a class="username" href={`#comments/${comment.id}`}>
        <span>{comment.by} - {comment.kids.length} child comments</span>
      </a>
    );
  }

  function renderComment(comment: Comment) {
    if (!comment.text) {
      return null;
    }
    return (
      <div>
        {username(comment)}
        <p class="comment" innerHTML={comment.text} />
        <div>
          <div class="divider"/>
        </div>
      </div>
    );
  }

  return (
    <ul>
      <For each={state.comments}>
        {
          (comment: Comment) => <>{renderComment(comment)}</>
        }
      </For>
    </ul>
  );
};