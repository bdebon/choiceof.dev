import MediaComponents from "libs/shared/ui/src/lib/shared/media-components";
import {removeQuestion, updateQuestionManager} from "libs/shared/application/question/question-client";
import {FormEvent, useState} from "react";
import {ApiReadQuestionDecorator} from "libs/shared/application/question/api-read-question-decorator";
import sharedStyle from "libs/shared/ui/src/lib/shared/shared.module.css";
import {
  ApiReadQuestion, ApiUpdateQuestion,
  apiUpdateQuestionFactory, QuestionState, questionStateList
} from "libs/shared/application/question/question";
import {Image} from "libs/shared/application/media/media";

export interface FormQuestionProps {
  question?: ApiReadQuestionDecorator,
  onUpdate?: (question: ApiReadQuestion | null, action: Action) => void
}

enum Context {
  CREATE = 'create',
  UPDATE = 'update'
}

export enum Action {
  CREATED = 'created',
  UPDATED = 'updated',
  REMOVED = 'removed'
}

export default function FormQuestion(props: FormQuestionProps) {
  let context: Context = props?.question ? Context.UPDATE : Context.CREATE
  let baseQuestionUpdate = apiUpdateQuestionFactory()
  let idQuestion: null | number = null

  if (props.question) {
    idQuestion = props.question.item.id
    baseQuestionUpdate = apiUpdateQuestionFactory(props.question.item)
  }

  const [questionUpdate, setQuestionUpdate] = useState<ApiUpdateQuestion>(baseQuestionUpdate)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    updateQuestionManager(questionUpdate, idQuestion)
      .then(response => {
        context = Context.UPDATE
        if (props.onUpdate) {
          props.onUpdate(response.data, Action.UPDATED)
        }
      })

    e.preventDefault()
  }

  const handleRemove = (e: FormEvent<HTMLFormElement>) => {
    if (!idQuestion) return
    removeQuestion(idQuestion)
      .then(() => {
        if (props.onUpdate) {
          props.onUpdate(null, Action.REMOVED)
        }
      })

    e.preventDefault()
  }

  const questionContentHandler = (questionContent: string): void => {
    setQuestionUpdate({...questionUpdate, ...{content: questionContent}})
  }

  const questionStateHandler = (stateContent: QuestionState): void => {
    setQuestionUpdate({...questionUpdate, ...{state: stateContent}})
  }

  const choiceContentHandler = (choiceContent: string, index: number): void => {
    const choices = questionUpdate.choices
    choices[index].content = choiceContent
    setQuestionUpdate({...questionUpdate, ...{choices: choices}})
  }

  const imageHandler = (image: Image, index): void => {
    console.log(image, index)
    const choices = questionUpdate.choices
    choices[index].image.id = image.id
    setQuestionUpdate({...questionUpdate, ...{choices: choices}})
  }

  return (<div className={'relative flex flex-col justify-center items-center max-w-5xl'}>
    <form
      className={sharedStyle.wrapper}
      onSubmit={handleSubmit}>
      <label className={sharedStyle.label}>Votre question</label>
      <input
        className={sharedStyle.input}
        onChange={(e) => questionContentHandler(e.target.value)}
        type="text"
        placeholder={'question...'}
        required
        value={questionUpdate.content}
      />
      <div className={'flex'}>
        {questionUpdate.choices.map((choice, index) => (
          <div key={`${index}-choice`} className={'w-1/2 p-2'}>
            <label className={sharedStyle.label}>{'Choix ' + (index + 1) + ':'}</label>
            <input
              className={sharedStyle.input}
              required
              value={choice.content}
              onChange={(e) => choiceContentHandler(e.target.value, index)}
              type="text"
              placeholder={'Choix ' + (index + 1) + '...'}/>
            <MediaComponents
              onChange={(image: Image) => imageHandler(image, index)}
              image={choice.image}/>
          </div>
        ))}
      </div>
      {context === Context.UPDATE && <div className={'mt-5'}>
        <label className={sharedStyle.label}>Statut de la question</label>
        <select className={sharedStyle.input}
                onChange={(e) => questionStateHandler(e.target.value as QuestionState)}
        >
          {questionStateList.map(state => (
            <option key={state} value={state} selected={state === questionUpdate.state}>{state}</option>
          ))}
        </select>
      </div>}
      {context === Context.UPDATE && <div className={'mt-5'}>
        <label className={sharedStyle.label}>Nombre total de vote :</label>
        <span>{props?.question?.item.totalVote}</span>
      </div>}
      <div className={'mt-5'}>
        <input
          className={sharedStyle.button}
          type="submit"
          value={context === Context.CREATE ? 'Envoyer' : 'Mettre à jour'}/>
        {context === Context.UPDATE &&
          <button
            onClick={handleRemove}
            className={sharedStyle.button_danger + ' mx-6'}
          >
            Supprimmer la question
          </button>}
      </div>
    </form>
  </div>)
}
