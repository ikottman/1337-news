import { createState, createEffect } from "solid-js";
import { For } from "solid-js/dom";
import { getStories, Item } from "./Service";
import { Story } from "./Story";
import './Stories.css';

type State = {
  stories: Item[]
};

export const Stories = () => {
  const [state, setState] = createState<State>({ stories: [] });

  function getPage(): number {
    const param = new URLSearchParams(window.location.search).get('page');
    if (param) {
      return Number.parseInt(param);
    }
    return 0;
  }

  createEffect(async () => {
    const stories = await getStories('top', getPage());
    setState({ stories });
  });

  return (
    <ul>
      <For each={state.stories}>
        {
          (story) => {
            return (
            <>
              <Story story={story} />
              <div class="divider"/>
            </>
          );
        }
      }
      </For>
      <li>
    <a href={`?page=${getPage() + 1}`}>Page {getPage() + 1}</a>
      </li>
    </ul>
  );
};