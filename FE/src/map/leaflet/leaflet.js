import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import script from './Scripts';
const MAP_VAR = 'leaflet';

const Leaflet = ({ mapMarkers, currentPosition }) => {
  const leafletRef = useRef();
  const zoomLevel = 13;
  const [leafletHTML, setLeafletHTML] = useState('');
  const [state, setLeafLetState] = useState({
    mapDimension: {
      height: 0,
      width: Dimensions.get('window').width - 0,
    },
  });

  useEffect(() => {
    const [latitude, longitude] = currentPosition;
    let html = script;
    html = html.replace('$lat', latitude);
    html = html.replace('$lng', longitude);
    setLeafletHTML(html);
  }, []);

  useEffect(() => {
    if (!leafletHTML) return;

    const [latitude, longitude] = currentPosition;
    leafletRef.current.injectJavaScript(
      `setView(${latitude},${longitude},${zoomLevel});`
    );
  }, [leafletHTML, currentPosition]);

  useEffect(() => {
    drawMarkers(mapMarkers);
  }, [mapMarkers]);

  const setState = (newObject) => {
    setLeafLetState({ ...state, ...newObject });
  };

  const findDimensions = ({ height }) => {
    const { mapDimension } = state;
    setState({
      mapDimension: {
        ...mapDimension,
        height,
      },
    });
  };

  const drawMarkers = (markers) => {
    if (leafletRef.current) {
      markers.map((marker) => {
        var data = JSON.stringify(marker);
        leafletRef.current.injectJavaScript(`createMarker('${data}');`);
      });
    }
  };

  const {
    html,
    mapDimension: { height, width },
  } = state;
  return (
    <View
      style={{ flex: 1 }}
      onLayout={(event) => {
        findDimensions(event.nativeEvent.layout);
      }}
    >
      <WebView
        ref={leafletRef}
        // injectedJavaScriptBeforeContentLoaded={`
        //   window.onerror = function(message, sourcefile, lineno, colno, error) {
        //     alert(message, sourcefile, lineno, colno, error);
        //     return true;
        //   };
        //   true;
        // `}
        style={{ flex: 1, height, width }}
        source={{ html: leafletHTML }}
        onError={(e) => {
          console.log(e);
        }}
      ></WebView>
    </View>
  );
};

export default Leaflet;
