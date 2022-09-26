import { Button, Text, View, StyleSheet } from 'react-native';

export default CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Camera Screen</Text>
      <Button title="hey click me"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
