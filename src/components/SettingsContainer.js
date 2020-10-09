import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { commonStyles, colors} from '../theme/theme.style';


export default class SettingsContainer extends PureComponent { 
  constructor(props){
    super(props)
    this.state = {
      selectedTimeInterval: props.selectedTimeInterval,
      selectedBaseCurrency: props.selectedBaseCurrency
    }
  }

  selectedBaseCurrencyChanged = value => {
    this.setState({
      selectedBaseCurrency: value
    })
    this.props.onSelectedBaseCurrencyChange(value);
  }

  selectedTimeIntervalChanged = value => {
    this.setState({
      selectedTimeInterval: value
    })
    this.props.onSelectedTimeIntervalChange(value);
  }

  render() {
      const baseCurrencyItems = this.props.baseCurrencyList;

      const refreshTimeItems = [
        {label: '3 seconds', value: '3'},
        {label: '5 seconds', value: '5'},
        {label: '15 seconds', value: '15'}
     ]

     const { selectedTimeInterval, selectedBaseCurrency } = this.state;

      return (
        <View style={[commonStyles.fill, styles.container]}>
          <View style={[commonStyles.fill,styles.settingsColumn]}>
            <Text style={styles.settingsLabel}>{'Refresh Interval'}</Text>
            <DropDownPicker
              items={refreshTimeItems}
              defaultValue={selectedTimeInterval}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => this.selectedTimeIntervalChanged(item.value)}
          />
          </View>
          <View style={[commonStyles.fill, styles.settingsColumn]}> 
            <Text style={styles.settingsLabel}>{'Base Currency'}</Text>
            <DropDownPicker
              items={baseCurrencyItems}
              defaultValue={this.state.selectedBaseCurrency}
              containerStyle={{height: 40}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={item => this.selectedBaseCurrencyChanged(item.value)}
          />
          </View>
        </View>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  settingsColumn: {
    marginTop: 30,
    marginHorizontal: 10
  },
  settingsLabel: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10
  }
});

