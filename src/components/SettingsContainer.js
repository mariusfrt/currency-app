import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Platform
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { commonStyles, colors} from '../theme/theme.style';
import Icon from "react-native-vector-icons/Ionicons";

const dropDownHeight = 40;

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
          <View style={[commonStyles.row, styles.titleContainer]}>
            {Platform.OS === 'android' && <Icon name={'settings-outline'} style={styles.iconStyle} />}
            <Text style={styles.settingsTitle}>{'Settings'}</Text>
          </View>
            <View style={[styles.settingsColumn]}>
              <Text style={styles.settingsLabel}>{'Refresh Interval'}</Text>
              <DropDownPicker
                items={refreshTimeItems}
                defaultValue={selectedTimeInterval}
                containerStyle={{height: dropDownHeight}}
                style={styles.dropDownBg}
                itemStyle={styles.dropDownItem}
                dropDownStyle={styles.dropDownBg}
                onChangeItem={item => this.selectedTimeIntervalChanged(item.value)}
            />
            </View> 
            <View style={[styles.settingsColumn,{marginTop:dropDownHeight * refreshTimeItems.length}]}> 
              <Text style={styles.settingsLabel}>{'Base Currency'}</Text>
              <DropDownPicker
                items={baseCurrencyItems}
                defaultValue={this.state.selectedBaseCurrency}
                containerStyle={{height: dropDownHeight}}
                style={styles.dropDownBg}
                itemStyle={styles.dropDownItem}
                dropDownStyle={styles.dropDownBg}
                onChangeItem={item => this.selectedBaseCurrencyChanged(item.value)}
            />
            </View>
        </View>
      )
    }
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'flex-start'
  },
  settingsColumn: {
    marginTop: 20,
    marginHorizontal: 10,
    position: 'relative'
  },
  settingsLabel: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  titleContainer:{
    alignItems:'center',
    marginTop: Platform.OS === 'android' ? 30 : 0,
    marginBottom: 30,
    marginLeft: Platform.OS === 'ios' ? 10 : 0
  },
  settingsTitle:{
    color: colors.textPrimary,
    fontSize: 35,
    fontWeight: 'bold',
    paddingBottom: 10,
    textAlign:'center'
  },
  dropDownBg: {
    backgroundColor: '#fafafa'
  },
  dropDownItem: {
    justifyContent: 'flex-start'
  },
  iconStyle:{
    fontSize: 25,
    alignSelf: 'baseline',
    color: colors.textPrimary,
    borderRadius: 10,
    padding: 10,
  }
});

