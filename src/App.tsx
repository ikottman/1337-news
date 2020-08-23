import { createSignal, onCleanup } from "solid-js";
import { Switch, Match } from "solid-js/dom";
import { Stories } from './Stories';
import { Comments } from "./Comments";
import { Header } from "./Header";

function createRouteHandler() {
  const [location, setLocation] = createSignal(window.location.hash.slice(1) || "stories");
  const locationHandler = () => setLocation(window.location.hash.slice(1) || "stories");
  window.addEventListener("hashchange", locationHandler);
  onCleanup(() => window.removeEventListener("hashchange", locationHandler));
  return (match: string) => location().includes(match);
}

function App() {
  const matches = createRouteHandler();
  return (
    <>
      <Header/>
      <Switch>
        <Match when={matches("stories")}>
          <Stories/>
        </Match>
        <Match when={matches("comments")}>
          <Comments/>
        </Match>
      </Switch>
    </>
  );
}

export default App;
