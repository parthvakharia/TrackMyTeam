import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import MapMarker from './MapMarker';
import * as Location from 'expo-location';
import Leaflet from './leaflet';

import ViewWithHeader from '../common/Header';

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
    location: [51.5, -0.096],
    url: 'https://picsum.photos/200',
    name: 'Helloworld',
    id: 1,
  },
  {
    location: [51.508, -0.11],
    url: 'https://picsum.photos/200',
    name: 'parth',
    id: 2,
  },
  {
    location: [22, -120],
    name: 'vakharia',
    url: 'https://picsum.photos/200',
    id: 3,
  },
  {
    location: [23, 44],
    name: 'Neel',
    url: 'https://picsum.photos/200',
    id: 4,
  },
];

const MapScreen = () => {
  const leafletRef = useRef();
  const [initialRegion, setInitialRegion] = useState([1, 1]);
  const [state, setMapScreenState] = useState({
    statusBarHeight: 0,
    mapDimension: {
      width: '100%',
      height: 100,
    },
    groupUsersLocations,
  });

  useEffect(() => {
    getLocation();
  }, [])

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    watchLocation(location);

    Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Balanced },
      watchLocation
    );
  };

  const watchLocation = ({ coords }) => {
    setInitialRegion([coords.latitude, coords.longitude]);
  };

  const { statusBarHeight, mapDimension } = state;
  return (
    <ViewWithHeader header={false}>
      <View style={[styles.container, { paddingTop: statusBarHeight }]}>
        <Leaflet
          leafletRef={(ref) => (leafletRef = ref)}
          mapMarkers={groupUsersLocations}
          currentPosition={initialRegion}
        />
      </View>
    </ViewWithHeader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    // width: '100%',
    // height: 50,
  },
});
export default MapScreen;
