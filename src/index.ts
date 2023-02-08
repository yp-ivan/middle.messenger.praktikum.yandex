require('babel-core/register');

import { renderDOM, registerComponent } from 'core';

import './styles/all.scss';

import ErrorBox from 'components/errorBox';
import Modal from 'components/modal';
import Link from 'components/link';
import Button from 'components/button';
import Input from 'components/input';
import InputError from 'components/inputError';
import InputWrap from 'components/inputWrap';
import Avatar from 'components/avatar';
import Channels from 'components/channels';
import ChannelsItem from 'components/channels/channelsItem';
import Messages from 'components/messages';
import MessagesItem from 'components/messages/messagesItem';
import ProfileDataItem from 'components/profileDataItem';

registerComponent(ErrorBox);
registerComponent(Modal);
registerComponent(Link);
registerComponent(Button);
registerComponent(Input);
registerComponent(InputError);
registerComponent(InputWrap);
registerComponent(Avatar);
registerComponent(Channels);
registerComponent(ChannelsItem);
registerComponent(Messages);
registerComponent(MessagesItem);
registerComponent(ProfileDataItem);

import HomePage from 'pages/home';

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new HomePage());
});
