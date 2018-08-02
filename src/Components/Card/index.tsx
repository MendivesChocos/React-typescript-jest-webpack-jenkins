import * as React from 'react';
import * as PropTypes from 'prop-types';
import { CardWrapper } from './index.style';

interface ICardProps {
  name?: string;
  age?: number;
  profesion?: string;
}

const Card: React.SFC<ICardProps> = ({ name, age, profesion }) => (
  <CardWrapper>
    <p>Name: {name}</p>
    <p>Age: {age}</p>
    <p>Profesion: {profesion}</p>
  </CardWrapper>
);

Card.propTypes =  {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  profesion: PropTypes.string,
};

export { Card };
