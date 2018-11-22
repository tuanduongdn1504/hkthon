import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import Touchable from '../Touchable';
import { Colors } from '../../themes';
const HomeItem = ({ item, onPress }) => {
  return (
    <Touchable onPress={() => onPress(item)}>
      <View style={styles.container}>
        <Text>{item?.displayName?.vi}</Text>
      </View>
    </Touchable>
  );
};
HomeItem.propTypes = {
  item: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider
  }
});

export default HomeItem;
