import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';


function Card (props: ViewProps) {
    const { style, ...otherProps } = props;

    return <View
        style={[styles.categoriesButton, style]}
        {...otherProps}
    >
        {props.children}
    </View>;
}

export default Card;

const styles = StyleSheet.create({
    categoriesButton: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 15,
    }
});