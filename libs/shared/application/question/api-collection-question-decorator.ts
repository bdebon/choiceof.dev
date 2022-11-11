import {ApiCollectionQuestion} from "libs/shared/application/question/question";
import {ApiReadQuestionDecorator} from "libs/shared/application/question/api-read-question-decorator";

export function questionCollectionFactory(apiQuestionCollectionRead: ApiCollectionQuestion): ApiCollectionQuestionDecorator {
  return new ApiCollectionQuestionDecorator(
    apiQuestionCollectionRead["hydra:member"].map(itemQuestion => {
      return new ApiReadQuestionDecorator(
        itemQuestion
      )
    }),
    apiQuestionCollectionRead
  )
}

export default class ApiCollectionQuestionDecorator {
  constructor(
    public collection: ApiReadQuestionDecorator[],
    public item: ApiCollectionQuestion,
    public currentItem: ApiReadQuestionDecorator|null = null
  ) {
    if (!currentItem && collection.length) {
      this.currentItem = collection[0]
    }
  }

  public getNext(): ApiReadQuestionDecorator|null { return this.change('next') }

  public getPrev(): ApiReadQuestionDecorator|null { return this.change('prev') }

  public next(): ApiReadQuestionDecorator|null { return this.currentItem = this.getNext() }

  public prev(): ApiReadQuestionDecorator|null { return this.currentItem = this.getPrev() }

  private change(direction: 'next'|'prev'): ApiReadQuestionDecorator|null {
    const currentItem = this.currentItem?.item?.id
    const currentIndex = currentItem ? this.findIndexById(currentItem) : 0
    const indexNeeded = currentIndex + (direction === 'next' ? 1 : -1)
    const indexValid = indexNeeded > 0 && indexNeeded < this.collection.length

    if (!indexValid) return null

    return indexValid ? this.collection[indexNeeded] : null
  }

  public findIndexById(id: number): number {
    return this.collection.findIndex(question => question?.item?.id === id)
  }

  public findBySlug(slug: string): ApiReadQuestionDecorator|undefined {
    return this.collection.find(question => question.item.slug === slug)
  }

  public findById(id: number): ApiReadQuestionDecorator {
    return this.collection[this.findIndexById(id)]
  }
}



