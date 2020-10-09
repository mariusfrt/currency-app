
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { commonStyles, colors} from '../theme/theme.style';
import withTheme from '../components/decorators/withTheme';
import { connect } from 'react-redux';
import { getCurrencyList, uiSetIsOffline } from '../store/actions/index';
import CurrencyListContainer from '../components/CurrencyListContainer';
import { bindNavigationEvents } from '../utils/navigation';
import { DEFAULT_SETTINGS } from '../utils/constants'
import NetInfo from '@react-native-community/netinfo';

@withTheme()
@connect(state => ({ 
  currencies: state.currencies.currencyList,
  isOffline: state.ui.isOffline,
  baseCurrency: state.settings.selectedBaseCurrency || DEFAULT_SETTINGS.BASE_CURRENCY,
  refreshInterval: state.settings.selectedTimeInterval || DEFAULT_SETTINGS.REFRESH_INTERVAL
}),
dispatch => ({
  onGetCurrencyList: baseCurrency => dispatch(getCurrencyList(baseCurrency)),
  onNetworkOffline: isOffline => dispatch(uiSetIsOffline(isOffline))
}))
export default class Home extends PureComponent {
  
  constructor(props) {
    super(props); 
    bindNavigationEvents(this);
  }

  isConnected = true;
  unsubscribe = null;
  timer = null;

  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.props.onNetworkOffline(!state.isConnected);
    });
    this.unsubscribe = NetInfo.addEventListener(state => {
      const currentConnection = state;
      if(this.isConnected !== currentConnection.isConnected){
        this.isConnected = currentConnection.isConnected;
        this.props.onNetworkOffline(!currentConnection.isConnected);
      }
    });
  }
  componentDidAppear() {
    this.runRefreshInterval();
  }

  componentDidDisappear() {
    clearTimeout(this.timer);
  }

  componentWillUnmount() {
    if(this.unsubscribe) this.unsubscribe();
  }

  runRefreshInterval(){
    const refreshInterval = this.props.refreshInterval * 1000;
    this.timer = setTimeout(() => {
      this.refreshCurrencyList();
      this.runRefreshInterval();
    },refreshInterval);
  }

  refreshCurrencyList() {
    const { baseCurrency, isOffline, onGetCurrencyList } = this.props;
    if(isOffline) return;
    onGetCurrencyList(baseCurrency);
  }

  render() {
    const { currencies, baseCurrency } = this.props;
    const content = currencies ? <CurrencyListContainer currencies={currencies} baseCurrency={baseCurrency} />
                                :(<View style={styles.loadingContainer}>
                                      <ActivityIndicator size="large" color={colors.loadingIndicator} />
                                      <Text style={styles.loadingText}>{'Loading currencies...'}</Text>
                                  </View> 
                                );
    return (
    <View style={styles.container}>
       {content}
     </View> 
    )
  }  
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 10,
    justifyContent:'center'
   },
   loadingContainer:{
    flex:1,
    justifyContent: 'center'
  },
   loadingText:{
     marginTop: 10,
     color: colors.textPrimary,
     fontWeight: 'bold',
     textAlign: 'center'
   }
})
  

