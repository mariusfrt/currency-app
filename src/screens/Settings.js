
import React, { PureComponent } from 'react';
import { StatusBar } from 'react-native';
import SettingsContainer from '../components/SettingsContainer';
import withTheme from '../components/decorators/withTheme';
import { setNavigationTitle } from '../utils/navigation';
import { connect } from 'react-redux';
import { setSelectedBaseCurrency, setSelectedTimeInterval, getCurrencyList } from '../store/actions/index';
import { DEFAULT_SETTINGS } from '../utils/constants';
import { currencySymbols } from '../utils/currencySymbols';

@withTheme()
@connect(state => ({ 
  currencies: state.currencies.currencyList,
  selectedBaseCurrency: state.settings.selectedBaseCurrency || DEFAULT_SETTINGS.BASE_CURRENCY,
  selectedTimeInterval: state.settings.selectedTimeInterval || DEFAULT_SETTINGS.REFRESH_INTERVAL
}),
dispatch => ({
  onSetSelectedBaseCurrency: value => {
    dispatch(setSelectedBaseCurrency(value));
    dispatch(getCurrencyList(value, true));
  },
  onSetSelectedTimeInterval: value => dispatch(setSelectedTimeInterval(value)),
}))
class Settings extends PureComponent {

  componentDidMount() {
    setNavigationTitle(this.props.componentId, 'Settings')
  }

  render() {
    const { 
      onSetSelectedBaseCurrency, 
      onSetSelectedTimeInterval, 
      selectedBaseCurrency, 
      selectedTimeInterval 
    } = this.props;

    const baseCurrencyList = []
    for (const [key, value] of Object.entries(this.props.currencies?.rates || {})) {     
      baseCurrencyList.push({
        label: currencySymbols[key]?.FullName || key,
        value: key,
      })
    }
    baseCurrencyList.push({
      label: currencySymbols[selectedBaseCurrency]?.FullName || selectedBaseCurrency,
      value: selectedBaseCurrency,
    });

    const statusBar = Platform.OS === 'ios' ? <StatusBar hidden/> : null;

    return (
      <>
        {statusBar}
        <SettingsContainer 
                baseCurrencyList={baseCurrencyList} 
                selectedBaseCurrency={selectedBaseCurrency}
                selectedTimeInterval={selectedTimeInterval}
                onSelectedBaseCurrencyChange={onSetSelectedBaseCurrency}
                onSelectedTimeIntervalChange={onSetSelectedTimeInterval}
              />
      </>
    )
   
  }  
};

export default Settings;