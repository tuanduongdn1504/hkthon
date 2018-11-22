import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { View, StyleSheet, Dimensions } from 'react-native';
import InputRow from '../../components/InputRow';
import Container from '../../components/Container';
import { Colors } from '../../themes';
import KeyboardAwareScrollViewUI from '../../components/KeyboardAwareScrollView';
import Button from '../../components/Button';
import Text from '../../components/Text';
import LoginActions from '../../redux/LoginRedux/actions';
import { push } from '../../navigation/navigationActions';
import { back } from '../../navigation/navigationButtons';

class SignIn extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('signIn')
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
    this.password = React.createRef();
  }

  login = () => {
    const { signIn } = this.props;
    if (this.email.getText() && this.password.getText()) {
      const data = {
        email: this.email.getText(),
        password: this.password.getText()
      };

      signIn(data);
    }
  };

  forgotPass = () => {
    const { componentId } = this.props;
    push(componentId, 'forgotPassword', {
      title: I18n.t('userInfo.password.forgotPassword'),
      leftButtons: [back()]
    });
  };

  focusNextField(nextField) {
    this[nextField].focus();
  }

  renderInputView = () => {
    return (
      <View style={styles.vInput}>
        <InputRow
          ref={ref => {
            this.email = ref;
          }}
          returnKeyType="next"
          animatedTitle
          underLine
          validateType="email"
          onSubmitEditing={() => this.focusNextField('password')}
          validateMessage={I18n.t('error.email')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.email')}
        />
        <InputRow
          ref={ref => {
            this.password = ref;
          }}
          animatedTitle
          underLine
          secureTextEntry
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.password.title')}
        />
      </View>
    );
  };

  renderButtonGroup = () => {
    const { fbSignIn } = this.props;
    return (
      <View style={styles.vButtonGroup}>
        <Button
          primary
          style={styles.btn}
          onPress={this.login}
          buttonTitle={I18n.t('signIn').toLocaleUpperCase()}
        />
        <Text
          type="body3"
          onPress={this.forgotPass}
          style={styles.txtForgotPass}
          color={Colors.primary}
        >
          {`${I18n.t('userInfo.password.forgotPassword')} `}
        </Text>
        <Button
          startColor={Colors.facebook}
          endColor={Colors.facebook}
          style={styles.btn}
          onPress={fbSignIn}
          fontAwesome="facebook-f"
          iconColor={Colors.default}
          buttonTitle={I18n.t('connectFB').toLocaleUpperCase()}
        />
      </View>
    );
  };

  render() {
    return (
      <Container>
        <KeyboardAwareScrollViewUI>
          {this.renderInputView()}
          {this.renderButtonGroup()}
        </KeyboardAwareScrollViewUI>
      </Container>
    );
  }
}
SignIn.propTypes = {
  fbSignIn: PropTypes.func,
  signIn: PropTypes.func,
  componentId: PropTypes.string
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  vInput: {
    marginHorizontal: 20
  },
  vButtonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 32
  },
  btn: {
    width: width - 40,
    marginTop: 40
  },
  txtForgotPass: {
    marginTop: 30,
    marginBottom: 10
  }
});

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(LoginActions.signIn(data)),
    fbSignIn: data => dispatch(LoginActions.fbSignIn(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
