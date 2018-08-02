import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { Card } from './';

it('Card Snapshot', () => {
  const component = mount(<Card name="Morder" age={300} profesion="FrontEnd" />);
  expect(component).toMatchSnapshot();
});
