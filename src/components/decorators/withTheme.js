import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { commonStyles, colors} from '../../theme/theme.style';

const withTheme = (Component) => {  
  return class WithTheme extends React.Component {    
    render() {
      return <>
        <SafeAreaView  style={commonStyles.fill}>
          <LinearGradient colors={colors.mainGradient} style={commonStyles.fill}>
            <Component {...this.props} {...this.state} />
          </LinearGradient>
        </SafeAreaView>
      </>
    }
  };
};

export default () => {
  return (target) => withTheme(target);
};