import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors, Images } from '../../themes';
import Button from '../../components/Button';
import Text from '../../components/Text';
import LoginActions from '../../redux/LoginRedux/actions';
import {
  push,
  startWithTabs,
  startWithSideMenu
} from '../../navigation/navigationActions';
import CheckUpdate from '../Home/CheckUpdate';
import SwipperView from '../../components/SwipperView';
import { back } from '../../navigation/navigationButtons';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
    this.password = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  signUp = () => {
    const { componentId } = this.props;
    push(componentId, 'signUp', {
      title: I18n.t('signUp'),
      leftButtons: [back()]
    });
  };

  signIn = () => {
    const { componentId } = this.props;
    push(componentId, 'signIn', {
      title: I18n.t('signIn'),
      leftButtons: [back()]
    });
  };

  fbSignIn = () => {
    const { fbSignIn } = this.props;
    startWithSideMenu();
  };

  renderIntro = data => (
    <View key={data} style={styles.vIntro}>
      <Image style={styles.introImg} source={Images[`intro${data}`]} />
      <Text type="title1" color={Colors.primaryText} center>
        {I18n.t(`intro.introTitle${data}`)}
      </Text>
      <Text
        type="body1"
        color={Colors.secondaryText}
        center
        style={styles.txtIntroDes}
      >
        {I18n.t(`intro.introDes${data}`)}
      </Text>
    </View>
  );

  renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          startColor={Colors.facebook}
          endColor={Colors.facebook}
          style={styles.btnLogin}
          onPress={this.fbSignIn}
          fontAwesome="facebook-f"
          iconColor={Colors.default}
          buttonTitle={I18n.t('connectFB').toLocaleUpperCase()}
        />
        <Button
          primary
          style={styles.btnLogin}
          onPress={this.signUp}
          buttonTitle={I18n.t('intro.createAccount').toLocaleUpperCase()}
        />
        <Text type="body3" style={styles.txtSignup} color={Colors.primaryText}>
          {`${I18n.t('intro.haveAccount')} `}
          <Text type="body3" onPress={this.signIn} color={Colors.primary}>
            {I18n.t('signIn')}
          </Text>
        </Text>
        <View style={{ height: 40 }} />
      </View>
    );
  };

  render() {
    const INTROS = [1, 2, 3, 4];

    return (
      <View style={styles.container}>
        <CheckUpdate />
        <View style={styles.container}>
          <SwipperView autoScroll>
            {INTROS.map(data => this.renderIntro(data))}
          </SwipperView>
        </View>
        {this.renderButtonGroup()}
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width
  },
  vButtonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 32
  },
  btnLogin: {
    width: width - 40,
    marginBottom: 20
  },
  vIntro: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  introImg: {
    width: width - 80
  },
  txtIntroDes: {
    marginTop: 15
  }
});

Intro.propTypes = {
  fbSignIn: PropTypes.func,
  // signIn: PropTypes.func,
  componentId: PropTypes.string
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    fbSignIn: data => dispatch(LoginActions.fbSignIn(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Intro);
