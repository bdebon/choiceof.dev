import MediaComponents from "../shared/media-components";
import {addQuestion, ApiQuestionCreate} from "../../../../api/question";

const labelStyle = 'block text-grey-darker text-sm font-bold mb-2'

export default function FormQuestion() {
  const questionCreate: ApiQuestionCreate = {
    content: '',
    choices: [
      {
        content: '',
        image: '',
        // TODO : refacto interface for remove total vote
        totalVote: 0
      },
      {
        content: '',
        image: '',
        totalVote: 0
      }
    ]
  }

  const handleSubmit = (e) => {
    addQuestion(questionCreate)
      .then((response) => {
        console.log(response)
      }).then(response => {
      console.log(response)
    })
    e.preventDefault()
  }

  return (<div className={'md:h-screen bg-white relative flex flex-col justify-center items-center'}>
    <form
      className={'bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-1/2'}
      onSubmit={handleSubmit}>
      <label className={labelStyle}>Votre question</label>
      <input
        onChange={(e) => questionCreate.content = e.target.value}
        type="text"
        placeholder={'question...'}
        required
      />
      <div className={'flex'}>
        {questionCreate.choices.map((choice, index) => (
          <div className={'w-1/2 p-2'}>
            <label className={labelStyle}>{'Choix ' + (index + 1) + ':'}</label>
            <input
              required
              key={index}
              onChange={(e) => choice.content = e.target.value}
              type="text"
              placeholder={'Choix ' + (index + 1) + '...'}/>
            <MediaComponents contentUrl={choice}></MediaComponents>
          </div>
        ))}
      </div>
      <input
        className={'cursor-pointer bg-blue-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded'}
        type="submit"
        value={'Envoyer'}/>
    </form>
  </div>)
}
