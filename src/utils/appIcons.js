import { PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/tutor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../themes';

const navIconSize =
  __DEV__ === false ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  home: [20, '#000'],
  search: [20, '#000'],
  chat: [20, '#000'],
  notification: [20, '#000'],
  shield: [20, '#000'],
  back: [25, '#fff'],
  close: [20, '#fff'],
  menu: [20, '#fff'],
  review: [20, Colors.primary],
  // TODO: Rating star
  'star-full': [20, Colors.orange],
  'star-empty': [20, Colors.orange],
  'star-half': [20, Colors.orange]
};

const iconsMap = {};
const iconsLoaded = new Promise(resolve => {
  new Promise.all(
    Object.keys(icons).map(iconName =>
      icons[iconName][2] === 'fontAwesome'
        ? FontAwesome.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1]
          )
        : Icon.getImageSource(
            iconName.replace(replaceSuffixPattern, ''),
            icons[iconName][0],
            icons[iconName][1]
          )
    )
  )
    .then(sources => {
      Object.keys(icons).forEach((iconName, idx) => {
        iconsMap[iconName] = sources[idx];
      });

      // Call resolve (and we are done)
      resolve(true);
    })
    .catch(err => {
      console.log(err);
    });
});

export { iconsMap, iconsLoaded };
