import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');
const cols = 3,
  rows = 3;

export default class MoviePoster extends Component {
  static propTypes = {
    movie: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired
  };

  render() {
    const {
      movie,
      movie: { title, genre, poster },
      onOpen
    } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={() => onOpen(movie)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: poster }} style={styles.image} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.genre} numberOfLines={1}>
          {genre}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10
  },
  imageContainer: {
    flex: 1 // take up all available space
  },
  image: {
    borderRadius: 10, // rounded corners
    ...StyleSheet.absoluteFillObject // fill up all space in a container
  },
  title: {
    fontSize: 14,
    marginTop: 4
  },
  genre: {
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14
  }
});
