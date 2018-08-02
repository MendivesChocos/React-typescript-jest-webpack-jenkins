import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { Wrapper } from '@app/src/Components/Wrapper';

interface IAppProps {
  route?:any;
}

export const App: React.SFC<IAppProps> = (props) => {
  return(
    <Wrapper>
      <div>Header</div>
      {renderRoutes(props.route.routes, { debugger: true })}
      <div>Footer</div>
    </Wrapper>
  );
};
