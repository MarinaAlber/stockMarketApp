import 'react-native';
import React from 'react';
import {render, screen} from '@testing-library/react-native';

import {Card} from './Card';

import renderer from 'react-test-renderer';

describe('Card component', () => {
  it('it renders correctly', () => {
    renderer.create(<Card title="test" subTitle="test sub title" />);
  });
  it('should add the first two letters as the company\'s name placeholder', () => {
    render(<Card title="test" subTitle="test sub title" />);
    expect(screen.getByText('te')).toBeOnTheScreen();
  });

  it('should render the title', () => {
    render(<Card title="test" subTitle="test sub title" />);
    expect(screen.getByText('test')).toBeOnTheScreen();
  });
});
