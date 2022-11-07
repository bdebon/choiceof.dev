import MediaComponents from "../shared/media-components";
import {addQuestion, ApiQuestionCreate} from "../../../../api/question";

export default function FormQuestion() {
  const questionCreate: ApiQuestionCreate = {
    content: '',
    choices: [
      {
        content: '',
        image: ''
      },
      {
        content: '',
        image: ''
      }
    ]
  }

  const handleSubmit = () => {
    addQuestion(questionCreate)
      .then((response) => {
        console.log(response)
      }).then(response => {
      console.log(response)
    })
  }

  return (<div>
    <form action="">
      <input
        onChange={(e) => questionCreate.content = e.target.value}
        type="text"
        placeholder={'Votre Question'}/>
      <div>
        <input
          onChange={(e) => questionCreate.choices[0].content = e.target.value}
          type="text"
          placeholder={'Votre Question'}/>
        <MediaComponents contentUrl={questionCreate.choices[0]}></MediaComponents>
      </div>
      <div>
        <input
          onChange={(e) => questionCreate.choices[1].content = e.target.value}
          type="text"
          placeholder={'Votre Question'}/>
        <MediaComponents contentUrl={questionCreate.choices[1]}></MediaComponents>
      </div>
      <input onClick={handleSubmit} type="button" value={'Envoyer'}/>
    </form>
  </div>)
}
