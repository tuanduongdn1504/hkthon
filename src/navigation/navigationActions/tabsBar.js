import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';
import { iconsMap } from '../../utils/appIcons';

export const startWithTabs = () => {
  const Tabs = [
    {
      label: 'home',
      title: 'Tutor',
      icon: iconsMap.home,
      screen: 'home',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: false,
          drawBehind: true,
          title: {
            text: I18n.t('appName'),
            color: Colors.primaryText
          }
        },
        backButton: {
          icon: iconsMap.back,
          visible: true
        }
      }
    },
    {
      label: 'home',
      title: 'Hihi',
      icon: iconsMap.chat,
      screen: 'home',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: false,
          drawBehind: true,
          title: {
            text: I18n.t('appName'),
            color: Colors.primaryText
          }
        },
        backButton: {
          icon: iconsMap.back,
          visible: true
        }
      }
    }
  ];

  const childrens = Tabs.map(data => ({
    stack: {
      children: [
        {
          component: {
            name: data.screen,
            options: {
              ...data.options
            }
          }
        }
      ],
      options: {
        bottomTabs: {
          drawBehind: false,
          translucent: true,
          hideShadow: false
        },
        bottomTab: configTab(data)
      }
    }
  }));

  Navigation.setRoot({
    root: {
      options: navigatorStyle,
      bottomTabs: {
        children: childrens,
        options: {
          // bottomTabs,
        }
      }
    }
  });
};

const configTab = data => ({
  title: data.title,
  icon: data.icon,
  text: data.title,
  // badge: '2',
  // badgeColor: 'red',
  textColor: Colors.secondaryText,
  iconColor: Colors.secondaryText,
  selectedIconColor: Colors.tabSelected,
  selectedTextColor: Colors.tabSelected,
  fontSize: 10,
  drawBehind: false
});
