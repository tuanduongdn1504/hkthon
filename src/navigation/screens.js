import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Common screen
import InAppNotification from '../screens/Popup/Notification';
import ProgressScreen from '../components/ProgressScreen';
// Intro
import Intro from '../screens/User/Intro';
import SignIn from '../screens/User/SignIn';
import Signup from '../screens/User/Signup';
import ForgotPassword from '../screens/User/ForgotPassword';
import ResetPassword from '../screens/User/ResetPassword';
import VerifyPassword from '../screens/User/VerifyPassword';
// tabbar
import Home from '../screens/Home';
import Detail from '../screens/Detail';
//SideMenu
import SideMenu from '../screens/User/SideMenu';

export function registerScreens(store, persistor) {
  const PersistProvider = props => {
    const { children } = props;
    return (
      <Provider {...props}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  };
  Navigation.registerComponent(
    'progressScreen',
    () => ProgressScreen,
    PersistProvider,
    store
  );
  Navigation.registerComponent(
    'inAppNotification',
    () => InAppNotification,
    () => InAppNotification,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'intro',
    () => Intro,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'signUp',
    () => Signup,
    PersistProvider,
    store
  );

  Navigation.registerComponentWithRedux(
    'home',
    () => Home,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'forgotPassword',
    () => ForgotPassword,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'verifyPassword',
    () => VerifyPassword,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'resetPassword',
    () => ResetPassword,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'signIn',
    () => SignIn,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'detail',
    () => Detail,
    PersistProvider,
    store
  );
  Navigation.registerComponentWithRedux(
    'sideMenu',
    () => SideMenu,
    PersistProvider,
    store
  );
}
