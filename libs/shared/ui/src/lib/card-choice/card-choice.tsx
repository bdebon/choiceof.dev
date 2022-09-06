export interface CardChoiceProps {
  title: string
  img_url: string
}

export function CardChoice(props: CardChoiceProps) {
  console.log('hello')
  return (
    <div>
      <h1>{props.title}</h1>
      <img src={props.img_url} />
    </div>
  );
}

export default CardChoice;
