import * as React from 'react';
import { App } from '@app/src/App';
import { CreatePost } from '@app/src/Containers/CreatePost';

const NotFound:React.SFC<{}> = () => <div>Not found</div>;

const Routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: CreatePost,
      },
      {
        path: '*',
        component: NotFound,
      },
    ],
  },
];

export { Routes };
