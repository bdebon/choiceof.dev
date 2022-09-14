import { getByTestId, getByText, queryByText, render, waitFor } from '@testing-library/react'
import { questions } from '@benjamincode/shared/assets'

import CardChoice, { CardChoiceProps } from './card-choice'

const props: CardChoiceProps = {
  title: questions[0].choiceLeft.title,
  showResult: false,
  totalCount: 100,
  voteCount: 40,
  position: 'left',
  onClick: () => {},
  imgUrl: questions[0].choiceLeft.img_path,
}

describe('CardChoice', () => {
  beforeEach(() => {
    props.showResult = false
    props.position = 'left'
  })

  it('should render successfully', () => {
    const { baseElement } = render(<CardChoice {...props} />)
    expect(baseElement).toBeTruthy()
  })

  it('should display the title', () => {
    const { baseElement } = render(<CardChoice {...props} />)
    getByText(baseElement, questions[0].choiceLeft.title)
  })

  it('should display background-image with cover', () => {
    const { baseElement } = render(<CardChoice {...props} />)
    const card = getByTestId(baseElement, 'card')
    expect(card.style.backgroundImage).toBe(`url(${questions[0].choiceLeft.img_path})`)
    expect(card.classList).toContain('bg-cover')
    expect(card.classList).toContain('bg-center')
  })

  it('should display the count result and the percentage', async () => {
    props.showResult = true
    const { baseElement } = render(<CardChoice {...props} />)
    getByText(baseElement, '40 votes')
    await waitFor(
      () => {
        getByText(baseElement, '40')
      },
      { timeout: 1200 }
    )
  })

  it('should not display the count result nor the percentage', () => {
    props.showResult = false
    const { baseElement } = render(<CardChoice {...props} />)
    const votes = queryByText(baseElement, '40 votes')
    const percent = queryByText(baseElement, '40%')
    expect(votes).toBeNull()
    expect(percent).toBeNull()
  })

  describe('mobile format', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 })
      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'))
    })

    it('should render with height at 50% and width 100%', () => {
      const { baseElement } = render(<CardChoice {...props} />)
      const card = getByTestId(baseElement, 'card')
      expect(card.style.height).toBe('50%')
      expect(card.style.width).toBe('100%')
    })

    it('should resize the card to 40% height', () => {
      props.showResult = true
      const { baseElement } = render(<CardChoice {...props} />)
      const card = getByTestId(baseElement, 'card')
      expect(card.style.height).toBe('40%')
      expect(card.style.width).toBe('100%')
    })

    it('should render stuck to top', () => {
      props.position = 'left'
      const { baseElement } = render(<CardChoice {...props} />)
      const card = getByTestId(baseElement, 'card')
      expect(card.classList).toContain('top-0')
    })

    it('should render stuck to top', () => {
      props.position = 'right'
      const { baseElement } = render(<CardChoice {...props} />)
      const card = getByTestId(baseElement, 'card')
      expect(card.classList).toContain('bottom-0')
    })
  })

  describe('desktop format', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1025 })
      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'))
    })

    it('should render with width at 50%', () => {
      const { baseElement } = render(<CardChoice {...props} />)
      const card = getByTestId(baseElement, 'card')
      expect(card.style.width).toBe('50%')
      expect(card.style.height).toBe('100%')
    })

    it('should resize the card to 40% width', () => {
      props.showResult = true
      const { baseElement } = render(<CardChoice {...props} />)
      const card = getByTestId(baseElement, 'card')
      expect(card.style.width).toBe('40%')
      expect(card.style.height).toBe('100%')
    })

    it('should render stuck to left', () => {
      props.position = 'left'
      const { baseElement } = render(<CardChoice {...props} />)
      const card = getByTestId(baseElement, 'card')
      expect(card.classList).toContain('lg:left-0')
    })

    it('should render stuck to right', () => {
      props.position = 'right'
      const { baseElement } = render(<CardChoice {...props} />)
      const card = getByTestId(baseElement, 'card')
      expect(card.classList).toContain('lg:right-0')
    })
  })
})
