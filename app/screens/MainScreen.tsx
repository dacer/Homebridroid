import { equals } from 'ramda';
import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceBlock from '../components/DeviceBlock';
import { Text, View } from '../components/Themed';
import { api, userPreferences } from '../ducks';
import { getDevices, DeviceLayout } from '../ducks/api/api.slice';

export default function MainScreen() {
  const dispatch = useDispatch();

  dispatch(getDevices({
    serverAddress: useSelector(userPreferences.selectors.getServerAddress),
    token: useSelector(api.selectors.getToken),
    username: "",
    password: ""
  }))
  const devices = useSelector(api.selectors.getDevices, equals)
  return (
    <ScrollView>
      <View style={styles.container}>
        { devices.map(room => <RoomView key={room.name} room={room} />) }
      
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => { dispatch(api.actions.logout()) }}
        >
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function RoomView({ room }: RoomProps) {
  return (
    <View style={styles.roomContainer}>
      <Text style={styles.title}>{room.name}</Text>
      {
        room.services.map(device => <DeviceBlock {...device} key={device.uniqueId} onClick={() => { console.log(device.serviceName) }} />)
      }
    </View>
  )
}

type RoomProps = { room: DeviceLayout }


const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
  },
  roomContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 60,
  },
  block: {
    width: 150,
    height: 150,
    backgroundColor: '#ffffff8c',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  blockEnabled: {
    backgroundColor: '#ffffff',
  },
  blockText: {
    color: '#413c69',
    fontSize: 26
  },
  blockDesc: {
    color: '#413c69',
    fontSize: 13
  },
  title: {
    width: '100%',
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 40,
  },
  logoutBtn: {
    width: 200,
    alignItems: 'center',
    backgroundColor: '#a7c5eb',
  },
  logoutBtnText: {
    fontSize: 20,
    color: '#413c69',
    padding: 10
  },
});
