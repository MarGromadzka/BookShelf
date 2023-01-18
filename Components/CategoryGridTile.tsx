import {Pressable, View, Text, StyleSheet, Platform} from "react-native";

function CategoryGridTile(props: {title: string, color: string, onPress: () => void}) {
  return (<View style={{...styles.container, backgroundColor: props.color}}>
    <Pressable
      android_ripple={{color: '#fff'}}
      style={({pressed}: {pressed: boolean}) => [styles.button, pressed ? styles.buttonPressed : null]}
      onPress={props.onPress}
    >
      <View style={styles.tileView}>
        <Text style={styles.textStyle}>{props.title}</Text>
      </View>
    </Pressable>
  </View>);
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    height: 150,
    borderRadius: 20,
    elevation: 10,
    backgroundColor: 'white',  // should be overwritten
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    overflow: Platform.select({android: 'hidden', ios: 'visible'}),
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  tileView: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});