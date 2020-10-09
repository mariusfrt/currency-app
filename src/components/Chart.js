import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { colors } from '../theme/theme.style';
import { LineChart } from "react-native-chart-kit";
import React from 'react';

const screenWidth = Dimensions.get("window").width-10;

const chart = props => {  
    const data = {
      labels: props.dataSet.labels,
      datasets: [
        {
          data: props.dataSet.data,
          color: (opacity = 0.9) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2 
        }
      ],
      legend: [props.legend]
    };

    const chartConfig = {
      backgroundGradientFromOpacity: 0,
      backgroundGradientToOpacity: 0.5,
      backgroundGradientFrom: '#161616',
      backgroundGradientTo: 'black',         
      decimalPlaces: 4, 
      color: (opacity = 0.9) => `rgba(255, 255, 255, ${opacity})`,
      strokeWidth: 2, 
      barPercentage: 0.5,
      useShadowColorFromDataset: false
    };       
    return (
      <LineChart
        data={data}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 16
        }}
      />
    );
};
const styles = StyleSheet.create({
   
});

export default chart;