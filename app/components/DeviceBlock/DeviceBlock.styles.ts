import { StyleSheet } from "react-native";

const CONTAINER_STYLE = {
  width: 150,
  height: 150,
  backgroundColor: '#ffffff8c',
  borderRadius: 10,
  padding: 10,
  margin: 10,
}

export default StyleSheet.create({
  container: CONTAINER_STYLE,
  containerEnabled: {
    ...CONTAINER_STYLE,
    backgroundColor: '#ffffff',
  },
  name: {
    color: '#413c69',
    fontSize: 26
  },
  desc: {
    color: '#413c69',
    fontSize: 13
  },
});
