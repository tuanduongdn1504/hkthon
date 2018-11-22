import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { Colors } from '../../themes/index';
import { menu, add } from '../navigationButtons';
import { navigatorStyle } from '../navigatonStyle';

export const startWithSideMenu = () => {
  const SIDE_MENU_COMPONENT = 'sideMenu';

  const stack = {
    options: {
      topBar: {
        visible: true
      }
    },
    children: [
      {
        component: {
          id: 'home',
          name: 'home',
          options: {
            ...navigatorStyle,
            topBar: {
              leftButtons: [menu()],
              title: {
                text: 'DanaQueue',
                color: Colors.titleNav
              }
            },
            fixedWidth: 300
          }
        }
      }
    ]
  };

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: 'sideMenu',
            name: SIDE_MENU_COMPONENT
          }
        },
        center: {
          stack
        }
      }
    }
  });
};

export default { startWithSideMenu };
