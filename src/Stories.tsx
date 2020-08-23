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

  createEffect(async () => {
    const stories = await getStories('top', 0);
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
    </ul>
  );
};