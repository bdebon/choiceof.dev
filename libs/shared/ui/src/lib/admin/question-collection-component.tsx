import {useState} from "react";
import {
  getQuestions,
  removeQuestion,
  updateQuestion
} from "../../../../api/question";
import QuestionItemComponent from "./question-item-component";
import QuestionCollection from "../../../../question/QuestionCollection";

export default function QuestionCollectionComponent(): JSX.Element {
  const [questionCollection, setQuestionCollection] = useState<QuestionCollection>();

  const loadQuestionCollection = () => {
    return getQuestions()
      .then(response => {
        setQuestionCollection(response.data)
      })
  }

  const handleRemoveQuestion = (id: number) =>
    removeQuestion(id).then(() => loadQuestionCollection())

  const handleChangeState = (id: number, state: string) =>
    updateQuestion(id, {state:state}).then(() => loadQuestionCollection())

  !questionCollection && loadQuestionCollection()

  return (<div>
    {!questionCollection && <div>
      <span>loading...</span>
    </div>}
    {questionCollection && <div>
      {
        questionCollection.collection.map(question => (
          <QuestionItemComponent
            key={question.item.id}
            removeQuestion={handleRemoveQuestion}
            questionItem={question}
            changeState={handleChangeState}/>
        ))
      }
    </div>}
  </div>)
}
