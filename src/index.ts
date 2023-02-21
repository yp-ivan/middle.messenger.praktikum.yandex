require('babel-core/register');

import { renderDOM, registerComponent } from 'core';

import './styles/all.scss';

import * as components from 'components';

Object.values(components).forEach((Component: any) => {
  registerComponent(Component);
});

import HomePage from 'pages/home';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new HomePage());
});
