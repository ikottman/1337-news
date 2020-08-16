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
    console.log(storyId);
    const story = await getItem(storyId);
    console.log(JSON.stringify(story.kids));
    const comments = await getItems(story.kids, 0, 30);
    console.log(JSON.stringify(comments));
    setState({ comments });
  });

  return (
    <ul>
      <For each={state.comments}>
        {
          (comment: Comment) => {
            return (
            <div>
              <div class="username">{comment.by}</div>
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