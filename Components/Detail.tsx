import {StyleSheet, Text, View} from "react-native";
import Card from "./Card";

type props = {
    name: string
    children: any
}

export default function Detail({name, children}: props) {
    return (
        <View style={styles.outerContainer}>
            <Text style={styles.title}>{name}</Text>
            <Card style={styles.categoriesButton}>
                {children}
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 10,
        color: "black",
    },
    categoriesButton: {
        padding: 10,
        backgroundColor: 'white',
    }
})