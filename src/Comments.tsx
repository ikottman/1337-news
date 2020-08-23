import { createState, createEffect, createSignal, onCleanup } from "solid-js";
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
  const [state, setState] = createState({comments: [], story: { title: '', url: '' }});
  const { getItems, getItem } = useStore();
  const [storyId, setStoryId] = createSignal(window.location.hash.split('/')[1]);
  const handleHashChange = () => setStoryId(window.location.hash.split('/')[1]);
  window.addEventListener("hashchange", handleHashChange);
  onCleanup(() => window.removeEventListener("hashchange", handleHashChange));

  createEffect(async () => {
    const story = await getItem(storyId());
    const comments = await getItems(story.kids, 0, 30);;
    setState({ comments, story: { title: story.title, url: story.url }});
  });

  function username(comment: Comment) {
    if (!comment.kids) {
      return <span class="username">{comment.by}</span>;
    }
    return (
      <a class="username" href={`#comments/${comment.id}`}>
        <span>{comment.by} - {comment.kids.length} child {comment.kids.length === 1 ? 'comment' : 'comments'}</span>
      </a>
    );
  }

  function renderComment(comment: Comment) {
    if (!comment.text) {
      return null;
    }
    return (
      <li>
        {username(comment)}
        <p class="comment" innerHTML={comment.text} />
        <div>
          <div class="divider"/>
        </div>
      </li>
    );
  }

  return (
    <ul>
      <li>
        <a href={state.story.url}>
            {state.story.title}
        </a>
      </li>
      <For each={state.comments}>
        {
          (comment: Comment) => <>{renderComment(comment)}</>
        }
      </For>
    </ul>
  );
};