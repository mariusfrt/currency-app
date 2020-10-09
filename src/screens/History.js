
import React, { PureComponent } from 'react';
import withTheme from '../components/decorators/withTheme';
import { setNavigationTitle } from '../utils/navigation';
import { connect } from 'react-redux';
import { getCurrencyHistory } from '../store/actions/index';
import { bindNavigationEvents } from '../utils/navigation';
import { colors, commonStyles } from '../theme/theme.style';
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  Text
} from "react-native";
import Chart from '../components/Chart';
import { DEFAULT_SETTINGS } from '../utils/constants'

@withTheme()
@connect(state => ({
  loading: state.ui.isCurrencyHistoryLoading,
  isOffline: state.ui.isOffline,
  currencyHistory: state.currencies.currencyHistory,
  baseCurrency: state.settings.selectedBaseCurrency || DEFAULT_SETTINGS.BASE_CURRENCY,
}),
dispatch => ({
  onGetCurrencyHistory: (baseCurrency, currencies, days) => dispatch(getCurrencyHistory(baseCurrency, currencies, days)),
}))
class History extends PureComponent {
  
  constructor(props) {
    super(props); 
    bindNavigationEvents(this);
    this.state={
      currenciesToShow: ['RON','USD','EUR'],
      allowedCurrencies: [],
      daysToGoBack: 10
    }
  }

  componentDidMount() {    
    setNavigationTitle(this.props.componentId, 'History');
  } 
  
  componentDidAppear() {
    
    const { componentId, onGetCurrencyHistory, baseCurrency, isOffline } = this.props;
    const { currenciesToShow, daysToGoBack } = this.state;
    const allowedCurrencies = currenciesToShow.filter(c => c !== baseCurrency);
    this.setState({
      allowedCurrencies
    })
    
    if(isOffline) return;

    onGetCurrencyHistory(
      baseCurrency, 
      allowedCurrencies.join(), 
      daysToGoBack
    );
  }

  render() {
    const { allowedCurrencies } = this.state;
    const { loading, currencyHistory, baseCurrency } = this.props;

    const content = allowedCurrencies.map((currency, index) => {
          if(!currencyHistory?.[currency]) return;
          else return (
            <Chart 
              key={index} 
              legend={`${currency} against ${baseCurrency}`} 
              dataSet={currencyHistory[currency]}
              />
          );
    });
                              
                            
    
    return (
      <ScrollView style={commonStyles.fill}>
        {content}
      </ScrollView>
    )
  }  
};

export default History;