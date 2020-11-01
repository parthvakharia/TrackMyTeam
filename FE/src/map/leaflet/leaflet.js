import React, { Component, useRef } from 'react';
import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import script from './script';
const MAP_VAR = 'leaflet';

class Leaflet extends Component {
  leafletRef = React.createRef();
  html = '';
  constructor(props) {
    super(props);
    this.state = {
      mapDimension: {
        height: 0,
        width: Dimensions.get('window').width - 0,
      },
      drawnMarkers: [],
    };
    const [latitude, longitude] = this.props.currentPosition;
    this.html = script;
    this.html = this.html.replace('$lat', latitude);
    this.html = this.html.replace('$lng', longitude);
  }

  componentDidMount() {}

  findDimensions({ height }) {
    const { mapDimension } = this.state;
    this.setState({
      mapDimension: {
        ...mapDimension,
        height,
      },
    });
  }

  drawMarkers = (markers) => {
    // && this.state.drawnMarkers != markers
    if (this.leafletRef.current) {
      markers.map((marker) => {
        // check for actual value change
        var data = JSON.stringify(marker);
        this.leafletRef.current.injectJavaScript(`createMarker('${data}');`);
      });
      if (this.state.drawnMarkers != markers) {
        this.setState({
          drawnMarkers: markers,
        });
      }
    }
  };

  componentDidUpdate(nextProps) {
    if (nextProps.mapMarkers) {
      this.drawMarkers(nextProps.mapMarkers);
    }
  }

  render() {
    const { height, width } = this.state.mapDimension;
    this.drawMarkers(this.props.mapMarkers);
    return (
      <View
        style={{ flex: 1 }}
        onLayout={(event) => {
          this.findDimensions(event.nativeEvent.layout);
        }}
      >
        <WebView
          ref={this.leafletRef}
          style={{ flex: 1, height, width }}
          source={{ html: this.html }}
          onError={(e) => {
            console.log(e);
          }}
        ></WebView>
      </View>
    );
  }
}

export default Leaflet;
