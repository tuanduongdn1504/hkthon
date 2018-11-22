import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import LoginActions from '../../redux/LoginRedux/actions';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import Actions from '../../redux/ForgotPasswordRedux/actions';
import Container from '../../components/Container';
import Text from '../../components/Text';
import SideMenuOption from '../../components/SideMenu/SideMenuOption';

class SideMenu extends Component {
  static propTypes = {};

  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('userInfo.password.resetPassword')
        }
      }
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Image
            source={{
              uri:
                'https://confession.vn/wp-content/uploads/2018/07/confession-confession-minh-xin-noi-nancy-gan-ay-thi-oan-video-cua-nanc.jpg'
            }}
            resizeMode="cover"
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text color="#fff" type="headline">
              Tuan Duong
            </Text>
            <Text style={{ paddingTop: 3 }} color="#fff" type="body3">
              Da Nang
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <SideMenuOption
            iconSideMenu="ios-home"
            iconColor="grey"
            titleSideMenu="Home"
            style={{ marginTop: 15 }}
          />
          <SideMenuOption
            iconSideMenu="ios-notifications"
            iconColor="grey"
            titleSideMenu="Notifications"
          />
          <SideMenuOption
            iconSideMenu="ios-clipboard"
            iconColor="grey"
            titleSideMenu="History"
          />
          <SideMenuOption
            iconSideMenu="ios-chatboxes"
            iconColor="grey"
            titleSideMenu="Language"
          />
          <SideMenuOption
            iconSideMenu="ios-tablet-portrait"
            iconColor="grey"
            titleSideMenu="About"
            onPress={() => this.props.signOut()}
          />
        </ScrollView>
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: 300,
    flex: 1
  },
  userInfoContainer: {
    height: 140,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 20
  }
});

function mapStateToProps(state) {
  return state.password;
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(LoginActions.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
