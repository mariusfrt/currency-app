import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../theme/theme.style';
import IconButton from '../components/IconButton';
import Icon from "react-native-vector-icons/Ionicons";
import { navigateTo } from '../utils/navigation';
import { SCREEN_COMPONENTS } from '../utils/constants';
import { connect } from 'react-redux';
import moment from 'moment';


@connect(state => ({
  loadingHistory: state.ui.isCurrencyHistoryLoading,
  lastSyncDate: state.currencies.lastSyncDate,
  isOffline: state.ui.isOffline,
}),
dispatch => ({}))
export default class TopBar extends PureComponent {
  
  goToSettings = () => {
    navigateTo(SCREEN_COMPONENTS.SETTINGS)
  }
  
  render() {
      const { isOffline, loadingHistory, lastSyncDate } = this.props;
      const bgRefreshIndicator = loadingHistory ? <ActivityIndicator size="small" color={colors.loadingIndicator} /> : null;
      const offlineIndicator = isOffline ? <Icon name={'cloud-offline-outline'} style={styles.offlineIcon} /> : null;
      const syncDate = isOffline ? moment(lastSyncDate) : moment();
      const lastUpdate = `LastSync: ${syncDate.format('DD MMM')} @ ${syncDate.format('HH:MM:ss')}`;

      return <View style={styles.container}>
        <View style={styles.leftSideControls}>
          <Text style={styles.headerText}>{'Currency App'}</Text>
          <Text style={styles.lastUpdateText}>{lastUpdate}</Text>
         </View>
         <View style={styles.rightSideControls}>
           {bgRefreshIndicator}
           {offlineIndicator}
          <IconButton onClick={this.goToSettings} icon="settings-outline" iconStyle={styles.settingsIcon}/>
         </View>
      </View>
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'black'
  },
  headerText:{
    color: colors.buttonPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  lastUpdateText:{
    color: colors.buttonPrimary,
    fontSize: 10,
    textAlign: 'left'
  },
  settingsIcon: {
    fontSize: 23
  },
  rightSideControls: {
    flexDirection: 'column'
  },
  rightSideControls: {
    flexDirection: 'row'
  },
  offlineIcon:{
    fontSize: 24,
    alignSelf: 'center',
    color: colors.textPrimary,
  }
})