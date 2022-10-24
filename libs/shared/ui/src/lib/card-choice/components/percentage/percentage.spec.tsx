import { getByText, queryByText, render, waitFor } from '@testing-library/react'
import Percentage, { PercentageProps } from './percentage'

const props: PercentageProps = {
  isVisible: false,
  percentage: 40,
}

describe('Percentage', () => {
  it('should display the count result and the percentage', async () => {
    props.isVisible = true;
    const { baseElement } = render(<Percentage {...props} />)
    await waitFor(
      () => {
        getByText(baseElement, '40')
      },
      { timeout: 1200 }
    )
  })

  it('shouldn\'t display the count result nor the percentage', () => {
    props.isVisible = false
    const { baseElement } = render(<Percentage {...props} />)
    const percent = queryByText(baseElement, '40%')
    expect(percent).toBeNull()
  })
})
