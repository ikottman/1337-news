import './Story.css';

export const Story = (props: any) => {
  return (
    <li>
      <a href={props.story.url}>
        {props.story.title}
      </a>
    </li>
  );
};