import { createState, createEffect } from "solid-js";
import { For } from "solid-js/dom";
import { useStore } from "./Store";
import { Story } from "./Story";

export const Stories = () => {
  const [state, setState] = createState({
    stories: []
  }),
    { getStories } = useStore();

  createEffect(async () => {
    const stories = await getStories('top', '0');
    setState({ stories });
  });

  return (
    <>
      <For each={state.stories}>
        {
          (story) => {
            return (
            <Story story={story} />
          );
        }
      }
      </For>
    </>
  );
};