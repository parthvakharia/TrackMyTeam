import React, { useContext, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const outerCircleRadius = 34;
const imageRadius = 28;

const MapMarker = ({ user, index }) => {
  return (
    <Marker tracksViewChanges={false} coordinate={user} key={index}>
      <View>
        {user.name && (
          <Text style={{ textAlign: 'center', fontSize: 14 }}>
            {user.name.substring(0, 5)}
          </Text>
        )}
        <View style={styles.outerCircle}>
          <Image
            style={styles.image}
            source={{ uri: 'https://picsum.photos/200' }}
          />
        </View>
        <View style={styles.triangleWrapper}>
          <View style={styles.triangle} />
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    height: outerCircleRadius,
    width: outerCircleRadius,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: outerCircleRadius / 2,
    backgroundColor: 'blue',
  },
  image: {
    height: imageRadius,
    width: imageRadius,
    resizeMode: 'cover',
    borderRadius: imageRadius / 2,
  },
  triangleWrapper: {
    marginTop: -3,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
    transform: [{ rotate: '180deg' }],
  },
});

export default MapMarker;
