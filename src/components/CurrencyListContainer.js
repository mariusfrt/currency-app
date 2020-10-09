import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { currencySymbols } from '../utils/currencySymbols';
import { commonStyles, colors, getRandomGradientColors} from '../theme/theme.style';
import { MAX_DIGITS } from '../utils/constants';

const renderCurrencyItem = item => {
  const currencySymbol = currencySymbols[item.name]?.Symbol || item.name
  
  return (
    <View style={styles.currencyRowContainer}>
      <View colors={colors.currencyRowGradient} style={[commonStyles.fill, commonStyles.row, {borderRadius: 10, backgroundColor: 'rgba(0,0,0,1'}]}>
        <View style={[commonStyles.fill,commonStyles.row, {padding:20}]}>
            <LinearGradient colors={item.gradient} style={[styles.currencyRowSymbolContainer]}>
              <Text style={styles.currencyRowSymbol}>{currencySymbol}</Text>
            </LinearGradient>
          <View style={styles.currencyRowInfoContainer}>
            <Text style={styles.currencyRowTextHeader}>{item.name}</Text>
            <Text style={styles.currencyRowText}>{currencySymbols[item.name]?.FullName}</Text>
          </View>
          <View style={styles.currencyRowValueContainer}>
            <Text style={styles.currencyRowValueText}>{item.value}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const currencyListContainer = props => 
{ 
    const currencyData = props.currencies || {}
    const rates = currencyData.rates || {};
    const baseCurrency = props.baseCurrency || ''
    const baseCurrencySymbol = currencySymbols[baseCurrency]?.Symbol || baseCurrency
    
    const currencyList = [] 
    for (const [key, value] of Object.entries(rates)) {     
      currencyList.push({
        name: key,
        value: `${baseCurrencySymbol} ${value.toFixed(MAX_DIGITS)}`,
        gradient: getRandomGradientColors(),
      })
    }

    return (
      <FlatList
        data={currencyList}
        renderItem={({ item }) => renderCurrencyItem(item)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
};

const styles = StyleSheet.create({
  currencyRowContainer:{
    flexDirection: 'row',
    marginHorizontal:20, 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    marginBottom: 15,
    borderRadius: 10
   },
   currencyRowSymbolContainer: {
     justifyContent: 'center', 
     marginRight: 20,
     padding: 10,
     backgroundColor: 'orange',
     width: 50,
     height: 50,
     borderRadius: 10
   },
   currencyRowSymbol: {
     color: colors.textPrimary,
     fontSize: 20,
     fontWeight: 'bold',
     textAlign: 'center'
   },
   currencyRowTextHeader:{
     color: colors.textPrimary,
     fontSize: 20,
     textShadowColor: 'black', 
     textShadowOffset: { width: -1, height: 0 },
     textShadowRadius: 5, 
     fontWeight: 'bold'
   },
   currencyRowValueText: {
     color: colors.textPrimary,
     fontSize: 14,
     textShadowColor: 'black', 
     textShadowOffset: { width: -1, height: 0 },
     textShadowRadius: 5, 
     fontWeight: 'bold'
   },
   currencyRowText: {
     color: colors.textSubheading,
     fontSize: 15,
     textShadowColor: 'black', 
     textShadowOffset: { width: -1, height: 0 },
     textShadowRadius: 5, 
     fontWeight: 'bold'
   },
   currencyRowValueContainer:{
     flex :1,
     alignItems: 'flex-end',
     justifyContent: 'flex-start'
   }
});

export default currencyListContainer;