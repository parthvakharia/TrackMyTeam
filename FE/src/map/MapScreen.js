import React, { useContext, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import MapMarker from './MapMarker';
import * as Location from 'expo-location';
import Leaflet from './leaflet';

import StoreContext from '../store';
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

class MapScreen extends React.Component {
  static contextType = StoreContext;
  leafletRef = React.createRef();
  state = {
    statusBarHeight: 0,
    initialRegion: [0, 0],
    mapDimension: {
      width: '100%',
      height: 100,
    },
    groupUsersLocations,
  };

  componentDidMount() {
    this.getLocation();
    const { store, dispatch } = this.context;
    // setTimeout(() => this.setState({ statusBarHeight: 2 }), 500);
    setInterval(() => {
      const { groupUsersLocations } = this.state;
      groupUsersLocations[0].location[1] += 0.001;
      this.setState({ groupUsersLocations });
    }, 2000);
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
    let location = await Location.getCurrentPositionAsync();
    this.watchLocation(location);
  };

  watchLocation = ({ coords }) => {
    const { initialRegion } = this.state;
    console.log('initialRegion', initialRegion);
    this.setState({
      initialRegion: [coords.latitude, coords.longitude],
    });
  };

  render() {
    const { initialRegion, statusBarHeight, mapDimension } = this.state;
    if (this.leafletRef) {
      // this.leafletRef.injectJavascript('console.log("helloworld")');
    }
    return (
      <ViewWithHeader header={false}>
        <View style={[styles.container, { paddingTop: statusBarHeight }]}>
          <Leaflet
            ref={(ref) => (this.leafletRef = ref)}
            mapMarkers={groupUsersLocations}
            currentPosition={initialRegion}
          />
        </View>
      </ViewWithHeader>
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
    // width: '100%',
    // height: 50,
  },
});
export default MapScreen;
