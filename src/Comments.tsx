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
      return <div class="username">{comment.by}</div>;
    }
    return (
      <a href={`#comments/${comment.id}`}>
        <span class="username">{comment.by} - {comment.kids.length}</span>
      </a>
    );
  }

  return (
    <ul>
      <For each={state.comments}>
        {
          (comment: Comment) => {
            return (
            <div>
              {username(comment)}
              <div class="comment" innerHTML={comment.text || ""} />
              <br/>
            </div>
          );
        }
      }
      </For>
    </ul>
  );
};