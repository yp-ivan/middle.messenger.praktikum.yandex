require('babel-core/register');

import { renderDOM, registerComponent } from 'core';

import './styles/all.scss';

import ErrorBox from 'components/errorBox';
import Link from 'components/link';
import Button from 'components/button';

registerComponent(ErrorBox);
registerComponent(Link);
registerComponent(Button);

import HomePage from 'pages/home';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new HomePage());
});
