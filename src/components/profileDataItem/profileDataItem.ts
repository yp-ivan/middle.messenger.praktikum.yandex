import Block from 'core/Block';

import './profileDataItem.scss';

export interface ProfileDataItemProps {
  title: string;
  value: string;
}

export class ProfileDataItem extends Block<ProfileDataItemProps> {
  static componentName = 'ProfileDataItem';

  render() {
    // language=hbs
    return `
      <div class="profile-item">
        <div class="profile-item__name">{{title}}</div>
        <div class="profile-item__value">{{value}}</div>
      </div>
    `;
  }
}
