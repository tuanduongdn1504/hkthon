import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Text from '../Text';
import Touchable from '../Touchable';

export default class SideMenuOption extends PureComponent {
  render() {
    const {
      style,
      iconSideMenu,
      iconColor,
      titleSideMenu,
      onPress
    } = this.props;
    return (
      <Touchable onPress={onPress}>
        <View style={[styles.optionItem, style]}>
          <IonIcons
            name={iconSideMenu}
            size={30}
            color={iconColor}
            style={styles.optionItemIcon}
          />
          <Text
            color="grey"
            type="headline"
            style={{ flex: 1, marginLeft: 15 }}
          >
            {titleSideMenu}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60
  },
  optionItemIcon: { marginLeft: 25 }
});
