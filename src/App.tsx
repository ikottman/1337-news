import { createSignal, onCleanup } from "solid-js";
import { Switch, Match } from "solid-js/dom";
import { Stories } from './Stories';
import { StoreProvider } from './Store';
import { Comments } from "./Comments";

function createRouteHandler() {
  const [location, setLocation] = createSignal(
      window.location.hash.slice(1) || "stories"
    ),
    locationHandler = () => setLocation(window.location.hash.slice(1));
  window.addEventListener("hashchange", locationHandler);
  onCleanup(() => window.removeEventListener("hashchange", locationHandler));
  return (match: string) => location().includes(match);
}

function App() {
  const matches = createRouteHandler();
  return (
    <StoreProvider>
      <Switch>
        <Match when={matches("stories")}>
          <Stories/>
        </Match>
        <Match when={matches("story")}>
          <Comments/>
        </Match>
      </Switch>
    </StoreProvider>
  );
}

export default App;
