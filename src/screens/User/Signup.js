import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes';
import Container from '../../components/Container';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import LoginActions from '../../redux/LoginRedux/actions';
import InputRow from '../../components/InputRow';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    Navigation.events().bindComponent(this);
  }

  submitData = () => {
    const { password, email, phoneNumber, fullName } = this;
    const { isEdit, editUser, signUp } = this.props;
    if (
      fullName.getText() &&
      email.getText() &&
      password.getText() &&
      phoneNumber.getText()
    ) {
      const data = {
        // first_name: firstName.getText(),
        // email: email.getText(),
        // last_name: lastName.getText(),
        // zip_code: zipCode.getText(),
        // phone_number: phoneNumber.getText()
        fullName: fullName.getText(),
        email: email.getText()
      };

      if (!isEdit) {
        data.password = password.getText();
      }

      if (isEdit) {
        editUser(data);
      } else {
        signUp(data);
      }
    }
  };

  onPressTerms = () => {};

  onPressPrivacy = () => {};

  focusNextField(nextField) {
    this[nextField].focus();
  }

  renderInput = () => {
    return (
      <View style={styles.vInput}>
        <InputRow
          ref={ref => {
            this.fullName = ref;
          }}
          onSubmitEditing={() => this.focusNextField('email')}
          returnKeyType="next"
          onEdi
          animatedTitle
          underLine
          style={{ flex: 1 }}
          placeholder={I18n.t('userInfo.name')}
        />
        <View style={{ width: 15 }} />
        <InputRow
          ref={ref => {
            this.email = ref;
          }}
          returnKeyType="next"
          animatedTitle
          underLine
          keyboardType="email-address"
          validateType="email"
          validateMessage={I18n.t('error.email')}
          onSubmitEditing={() => this.focusNextField('phoneNumber')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.email')}
        />
        <InputRow
          ref={ref => {
            this.phoneNumber = ref;
          }}
          returnKeyType="next"
          animatedTitle
          underLine
          keyboardType="phone-pad"
          validateType="number"
          validateMessage={I18n.t('error.phoneNumber')}
          onSubmitEditing={() => this.focusNextField('password')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.phone')}
        />
        <InputRow
          ref={ref => {
            this.password = ref;
          }}
          animatedTitle
          underLine
          secureTextEntry
          validateType="password"
          validateMessage={I18n.t('error.password')}
          placeholder={I18n.t('userInfo.password.title')}
        />
        {/* {!isEdit && (
          <Checkbox
            onPress={this.onTogglePrivacy}
            isChecked={isConfirmPrivacy}
            title={I18n.t('userInfo.signupPrivacy')}
          />
        )} */}
      </View>
    );
  };

  renderButtonView = () => {
    const { isEdit } = this.props;
    return (
      <View style={styles.vButton}>
        {!isEdit && (
          <Button
            style={styles.button}
            onPress={this.submitData}
            buttonTitle={I18n.t('signUp').toLocaleUpperCase()}
          />
        )}
        {isEdit && (
          <Button
            style={styles.button}
            onPress={this.submitData}
            buttonTitle={I18n.t('save')}
          />
        )}
        <Text
          type="body3"
          color={Colors.primaryText}
          center
          style={styles.termsAndPrivacy}
        >
          {I18n.t('auth.termsAndPrivacy')}
          <Text type="body3" onPress={this.onPressTerms} color={Colors.primary}>
            {I18n.t('auth.terms')}
          </Text>{' '}
          {I18n.t('auth.and')}{' '}
          <Text
            type="body3"
            onPress={this.onPressPrivacy}
            color={Colors.primary}
          >
            {I18n.t('auth.privacy')}
          </Text>{' '}
        </Text>
      </View>
    );
  };

  renderHeader = () => {
    const { avatar } = this.state;
    return (
      <Avatar
        image={avatar || null}
        setImage={data => this.onChangeValue('avatar', true)(data.uri)}
        circle
      />
    );
  };

  render() {
    const { isEdit } = this.props;
    return (
      <Container>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {isEdit && this.renderHeader()}
            {this.renderInput()}
            {this.renderButtonView()}
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

Signup.propTypes = {
  isEdit: PropTypes.bool,
  editUser: PropTypes.func,
  signUp: PropTypes.func
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20
  },
  vInput: {
    marginTop: 35,
    paddingHorizontal: 20
  },
  vButton: {
    paddingHorizontal: 20
  },
  button: {
    width: width - 40,
    backgroundColor: Colors.primary,
    marginTop: 40
  },
  row: {
    flexDirection: 'row',
    width: width - 40
  },
  termsAndPrivacy: {
    marginTop: 20
  }
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
    token: state.login.token
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => dispatch(LoginActions.signUp(data)),
    editUser: data => dispatch(LoginActions.editUser(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
