import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {
  View,
} from "native-base";
import {
  BarChart,
  LineChart
} from "react-native-chart-kit";

import Colors from '../constants/Colors';

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};


const ReportContainer = ({ onPressCallback }) => {
  useEffect(() => {

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bar Chart</Text>
      <BarChart
        data={{
          labels: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June"],
          datasets: [
            {
              data: [
                Math.floor(5000 + Math.random() * (8000 + 1 - 5000)),
                Math.floor(5000 + Math.random() * (8000 + 1 - 5000)),
                Math.floor(5000 + Math.random() * (8000 + 1 - 5000)),
                Math.floor(5000 + Math.random() * (8000 + 1 - 5000)),
                Math.floor(5000 + Math.random() * (8000 + 1 - 5000)),
                Math.floor(5000 + Math.random() * (8000 + 1 - 5000))
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 32}
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#fff",
          strokeWidth: 2,
          backgroundGradientFrom: "#fefefe",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(42, 125, 193, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(11, 34, 54, ${opacity})`,
          style: {
            borderRadius: 0,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "4",
            stroke: "#236ba7"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 2,
          backgroundColor: '#236ba7'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  graphStyle: {
    marginVertical: 8,
  },
  text: {
    marginTop: 18,
    fontSize: 16,
    color: Colors.fume
  },
});

export default ReportContainer;