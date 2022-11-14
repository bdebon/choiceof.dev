import {useState} from "react";
import {
  getQuestions,
} from "libs/shared/application/question/question-client";
import ApiCollectionQuestionDecorator from "libs/shared/application/question/api-collection-question-decorator";
import LoaderComponent from "libs/shared/ui/src/lib/shared/loader/loader-component";
import FormQuestion, {Action} from "libs/shared/ui/src/lib/new-question/form-question";
import {ApiReadQuestion} from "libs/shared/application/question/question";

export default function QuestionCollectionComponent(): JSX.Element {
  const [questionCollection, setQuestionCollection] = useState<ApiCollectionQuestionDecorator>();

  const loadQuestionCollection = () => {
    return getQuestions()
      .then(response => {
        setQuestionCollection(response.data)
      })
  }

  const handleChange = (question: ApiReadQuestion|null, action: Action): void => {
    loadQuestionCollection()
  }

  !questionCollection && loadQuestionCollection()

  return (<div>
    {!questionCollection && <div>
      <LoaderComponent/>
    </div>}
    {questionCollection && <div>
      {
        questionCollection.collection.map(questionDecorator => (
          <FormQuestion onUpdate={handleChange} key={questionDecorator.item.id + '-question'} question={questionDecorator}/>
        ))
      }
    </div>}
  </div>)
}
