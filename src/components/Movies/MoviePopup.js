import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Options from './Option';

const { width, height } = Dimensions.get('window');
const defaultHeight = height * 0.67;

export default class MoviePopup extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    movie: PropTypes.object,
    chosenDay: PropTypes.number,
    chosenTime: PropTypes.number,
    onChooseDay: PropTypes.func,
    onChooseTime: PropTypes.func,
    onBook: PropTypes.func,
    onClose: PropTypes.func
  };

  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height),
    opacity: new Animated.Value(0),
    height: defaultHeight,
    expanded: false,
    visible: this.props.isOpen
  };

  _previousHeight = 0;

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dx, dy } = gestureState;
        if (dx !== 0 && dy === 0) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (evt, gestureState) => {
        this._previousHeight = this.state.height;
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dy, vy } = gestureState;
        let newHeight = this._previousHeight - dy;

        LayoutAnimation.easeInEaseOut();

        if (newHeight > height - height / 5) {
          this.setState({ expanded: true });
        } else {
          this.setState({ expanded: false });
        }

        if (vy < -0.75) {
          this.setState({
            expanded: true,
            height: height
          });
        } else if (vy > 0.75) {
          this.props.onClose();
        } else if (newHeight < defaultHeight * 0.75) {
          this.props.onClose();
        }
        // Limit max height to screen height
        else if (newHeight > height) {
          this.setState({ height: height });
        } else {
          this.setState({ height: newHeight });
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { dy } = gestureState;
        const newHeight = this._previousHeight - dy;

        if (newHeight < defaultHeight) {
          this.props.onClose();
        }

        // Update previous height
        this._previousHeight = this.state.height;
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  animateOpen() {
    this.setState({ visible: true }, () => {
      Animated.parallel([
        Animated.timing(this.state.opacity, { toValue: 0.5 }),
        Animated.timing(this.state.position, { toValue: 0 })
      ]).start();
    });
  }

  animateClose() {
    Animated.parallel([
      Animated.timing(this.state.opacity, { toValue: 0 }),
      Animated.timing(this.state.position, { toValue: height })
    ]).start(() =>
      this.setState({
        height: defaultHeight,
        expanded: false,
        visible: false
      })
    );
  }

  getStyles = () => {
    return {
      imageContainer: this.state.expanded
        ? {
            width: width / 2
          }
        : {
            maxWidth: 110,
            marginRight: 10
          },
      movieContainer: this.state.expanded
        ? {
            flexDirection: 'column',
            alignItems: 'center'
          }
        : {
            flexDirection: 'row'
          },
      movieInfo: this.state.expanded
        ? {
            flex: 0,
            alignItems: 'center',
            paddingTop: 20
          }
        : {
            flex: 1,
            justifyContent: 'center'
          },
      title: this.state.expanded
        ? {
            textAlign: 'center'
          }
        : {}
    };
  };

  render() {
    const {
      movie,
      chosenDay,
      chosenTime,
      onChooseDay,
      onChooseTime,
      onBook
    } = this.props;
    const { title, genre, poster, days, times } = movie || {};

    if (!this.state.visible) {
      return null;
    }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View
            style={[styles.backdrop, { opacity: this.state.opacity }]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modal,
            {
              height: this.state.height,
              transform: [
                { translateY: this.state.position },
                { translateX: 0 }
              ]
            }
          ]}
        >
          <View style={styles.content}>
            <View
              style={[styles.movieContainer, this.getStyles().movieContainer]}
              {...this._panResponder.panHandlers}
            >
              <View
                style={[styles.imageContainer, this.getStyles().imageContainer]}
              >
                <Image source={{ uri: poster }} style={styles.image} />
              </View>
              <View style={[styles.movieInfo, this.getStyles().movieInfo]}>
                <Text style={[styles.title, this.getStyles().title]}>
                  {title}
                </Text>
                <Text style={styles.genre}>{genre}</Text>
              </View>
            </View>

            <View>
              <Text style={styles.sectionHeader}>Day</Text>
              <Options
                values={days}
                chosen={chosenDay}
                onChoose={onChooseDay}
              />
              <Text style={styles.sectionHeader}>Showtime</Text>
              <Options
                values={times}
                chosen={chosenTime}
                onChoose={onChooseTime}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableHighlight
              underlayColor="#9575CD"
              style={styles.buttonContainer}
              onPress={onBook}
            >
              <Text style={styles.button}>Book My Tickets</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject, // fill up all screen
    justifyContent: 'flex-end', // align popup at the bottom
    backgroundColor: 'transparent' // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject, // fill up all screen
    backgroundColor: 'black'
  },
  // Popup
  modal: {
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0
  },
  // Movie container
  movieContainer: {
    flex: 1, // take up all available space
    marginBottom: 20
  },
  imageContainer: {
    flex: 1 // take up all available space
  },
  image: {
    borderRadius: 10, // rounded corners
    ...StyleSheet.absoluteFillObject // fill up all space in a container
  },
  movieInfo: {
    backgroundColor: 'transparent' // looks nicier when switching to/from expanded mode
  },
  title: {
    fontSize: 20
  },
  genre: {
    color: '#BBBBBB',
    fontSize: 14
  },
  sectionHeader: {
    color: '#AAAAAA'
  },
  // Footer
  footer: {
    padding: 20
  },
  buttonContainer: {
    backgroundColor: '#673AB7',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center'
  },
  button: {
    color: '#FFFFFF',
    fontSize: 18
  }
});
