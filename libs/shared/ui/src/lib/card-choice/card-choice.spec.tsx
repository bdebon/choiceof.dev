import { render } from '@testing-library/react';

import CardChoice from './card-choice';

describe('CardChoice', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CardChoice />);
    expect(baseElement).toBeTruthy();
  });
});
