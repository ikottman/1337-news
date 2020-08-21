import './Story.css';

export const Story = (props: any) => {
  return (
    <li>
      <a href={`#comments/${props.story.id}`}>{
          props.story.descendants ? `${props.story.descendants}` : '0'
        }</a>
      <span> | </span>
      <a href={props.story.url}>
        {props.story.title}
      </a>
    </li>
  );
};