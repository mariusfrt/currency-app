import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from '../theme/theme.style';

const iconButton = props => {         
    return (
        <TouchableOpacity style={styles.touchable} onPress={props.onClick} >            
            <Icon name={props.icon} style={[styles.icon,props.iconStyle]}>
                <Text style={styles.text}>{props.text}</Text>
            </Icon>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        alignSelf: 'baseline',
        color: colors.textPrimary,
        borderRadius: 10,
        padding: 10
    },
    touchable:{
        alignSelf: 'baseline',
    },
    text: {
        fontSize: 18,
        paddingBottom:3,
        color: colors.textPrimary,
    }
});

export default iconButton;