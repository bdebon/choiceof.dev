import {ApiQuestionCollectionRead, ApiQuestionItem} from "../api/question";
import {ChoiceItem} from "./Choice";


export function questionCollectionFactory(apiQuestionCollectionRead: ApiQuestionCollectionRead): QuestionCollection {
  const questionItems = apiQuestionCollectionRead["hydra:member"].map(itemQuestion => {
    return new QuestionItem(
      itemQuestion
    )
  });

  return new QuestionCollection(questionItems, apiQuestionCollectionRead)
}

export class QuestionItem {
  constructor(
    public item: ApiQuestionItem,
    public choiceItems: ChoiceItem[] = null,
    public hasVoted: boolean = false
  ) {
    this.choiceItems =  item.choices.map(itemChoice => new ChoiceItem(itemChoice, this))
  }

  public addVote(itemChoiceId: number): void {
    if (this.hasVoted) return;

    this.getChoiceById(itemChoiceId).addVote()
    this.item.totalVote++

    this.hasVoted = true
  }

  public getChoiceById(itemChoiceId: number): ChoiceItem {
    return this.choiceItems.find(choiceItem => choiceItem.item.id === itemChoiceId)
  }
}

export default class QuestionCollection {
  constructor(
    public collection: QuestionItem[],
    public item: ApiQuestionCollectionRead,
    public currentItem: QuestionItem|null = null
  ) {
    if (!currentItem && collection.length) {
      this.currentItem = collection[0]
    }
  }

  public getNext(): QuestionItem|null { return this.change('next') }

  public getPrev(): QuestionItem|null { return this.change('prev') }

  public next(): QuestionItem|null { return this.currentItem = this.getNext() }

  public prev(): QuestionItem|null { return this.currentItem = this.getPrev() }

  private change(direction: 'next'|'prev'): QuestionItem|null {
    const currentIndex = this.findIndexById(this.currentItem.item.id)
    const indexNeeded = currentIndex + (direction === 'next' ? 1 : -1)
    const indexValid = indexNeeded > 0 && indexNeeded < this.collection.length

    if (!indexValid) return null

    return indexValid ? this.collection[indexNeeded] : null
  }

  public findIndexById(id: number): number {
    return this.collection.findIndex(question => question.item.id === id)
  }

  public findBySlug(slug: string): QuestionItem {
    return this.collection.find(question => question.item.slug === slug)
  }

  public findById(id: number): QuestionItem {
    return this.collection[this.findIndexById(id)]
  }
}
