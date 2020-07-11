import React, { useContext, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapMarker from './MapMarker';
import * as Location from 'expo-location';

import StoreContext from '../store';
import { registerUser, signIn } from '../store/AuthActions';

const dummyUser = {
  username: 'htrap007',
  email: 'pvakharia007@gmail.com',
  currentLocation: {
    lat: 27,
    lng: 23,
  },
  profilePicture: '',
  password: 'helloworld',
};
const dummyUser2 = {
  username: 'parth007',
  email: '007pvakharia@gmail.com',
  currentLocation: {
    lat: 27.5678,
    lng: 23.3456,
  },
  profilePicture: '',
  password: 'helloworld',
};

const groupUsersLocations = [
  {
    latitude: 21.350566,
    latitudeDelta: 0.0922,
    longitude: 72.2224965,
    longitudeDelta: 0.0421,
    name: 'Helloworld',
  },
  {
    latitude: 21.5674566,
    latitudeDelta: 0.0922,
    longitude: 72.9124965,
    longitudeDelta: 0.0421,
    name: 'parth',
  },
  {
    latitude: 21.176405,
    latitudeDelta: 0.0922,
    longitude: 72.812434,
    longitudeDelta: 0.0421,
    name: 'vakharia',
  },
  {
    latitude: 21.7954566,
    latitudeDelta: 0.0922,
    longitude: 72.3244965,
    longitudeDelta: 0.0421,
    name: 'Neel',
  },
];

class Map extends React.Component {
  static contextType = StoreContext;
  state = {
    statusBarHeight: 0,
    initialRegion: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  componentDidMount() {
    this.getLocation();
    const { store, dispatch } = this.context;
    signIn(store, dispatch, dummyUser);
    setTimeout(() => this.setState({ statusBarHeight: 2 }), 500);
  }

  getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Balanced },
      this.watchLocation
    );
  };

  watchLocation = ({ coords }) => {
    const { initialRegion } = this.state;
    this.setState({
      initialRegion: {
        ...initialRegion,
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    });
  };

  render() {
    const { initialRegion, statusBarHeight } = this.state;
    return (
      <View style={[styles.container, { paddingTop: statusBarHeight }]}>
        <MapView
          showsUserLocation
          showsMyLocationButton
          provider={PROVIDER_GOOGLE}
          region={initialRegion}
          style={styles.mapStyle}
        >
          {groupUsersLocations.map((user, index) => (
            <MapMarker user={user} index={index} />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default Map;
