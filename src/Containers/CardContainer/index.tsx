import * as React from 'react';
import { Card } from '@app/src/Components/Card';

interface Props {
  store?: any;
}

export class CardContainer extends React.Component<Props, {}> {
  render(): JSX.Element {
    const { name, age, profesion } = this.props.store.data;
    const props = { name, age, profesion };
    return(
        <Card {...props}/>
    );
  }
}
