import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { globalStyle } from '@app/config/globalStyle';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Routes } from '@app/config/routes';

globalStyle();
ReactDOM.render(
  <Router>
      {renderRoutes(Routes)}
  </Router>,
  document.getElementById('root'),
);
