/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import { showInAppNoti } from '../../navigation/navigationActions/showInAppNotification';
import { showModal } from '../../navigation/navigationActions/showModal';
import HomeItem from '../../components/Items/HomeItem';
import { push } from '../../navigation/navigationActions';

class Home extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      popupIsOpen: false,
      chosenDay: 0,
      chosenTime: null
    };
  }

  componentDidMount() {
    // this.onRefresh();
  }

  openMovie = movie => {
    this.setState({
      popupIsOpen: true,
      movie
    });
  };

  closeMovie = () => {
    this.setState({
      popupIsOpen: false,
      chosenDay: 0,
      chosenTime: null
    });
  };

  chooseDay = day => {
    this.setState({
      chosenDay: day
    });
  };

  chooseTime = time => {
    this.setState({
      chosenTime: time
    });
  };

  bookTicket = () => {
    if (!this.state.chosenTime) {
      alert('Please select show time');
    } else {
      this.closeMovie();
    }
  };

  onRefresh = e => {
    // this.props.getCaseTypes({}, { isRefresh: true });
  };

  showNoti = () => {
    showInAppNoti('test', 'hello', 'error');
  };
  showModal = () => {
    showModal();
  };

  loadMore = e => {
    const { enabledLoadMore, getCaseTypes } = this.props;
    if (enabledLoadMore) {
      getCaseTypes();
    }
  };

  onPressItem = item => {
    const { componentId } = this.props;

    push(componentId, 'detail', {
      title: 'Detail',
      passProps: {
        item: item
      }
    });
  };

  renderItem = ({ item, index }) => {
    return <HomeItem onPress={this.onPressItem} item={item} />;
  };

  render() {
    const { caseTypes, loading } = this.props;
    return (
      <Container style={styles.container}>
        <CheckUpdate />
      </Container>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  },
  btn: {
    margin: 20
  }
});

function mapStateToProps(state) {
  return {
    // caseTypes: getDataArr(state, 'caseTypes'),
    // enabledLoadMore: enabledLoadMore(state, 'caseTypes'),
    // loading: state.caseTypes.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // getCaseTypes: (data, options) =>
    //   dispatch(CaseTypesActions.getAllCaseTypes(data, options))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
