export const Story = (props: any) => {
  return (
    <a href={props.story.url}>
      {props.story.title}
    </a>
  );
};