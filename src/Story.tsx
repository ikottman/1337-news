import './Story.css';

export const Story = (props: any) => {
  return (
    <li>
      <a href={props.story.url}>
        {props.story.title}
      </a>
      <br/>
      <a class='comments' href={`#comments/${props.story.id}`}>{
          props.story.descendants ? `${props.story.descendants}` : '0'
        } {props.story.descendants === 1 ? 'comment' : 'comments'}
      </a>
    </li>
  );
};