import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView from 'react-native-maps/lib/MapView'
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";


const Map = () => {
  const dispatch = useDispatch()
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const mapRef = useRef(null);

  useEffect(() => {
    if(!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
      edgePadding: {top:50, right:50, bottom:50, left:50},
    })
    console.log("ooi")

  }, [origin, destination])

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = () => {
      var axios = require('axios');

var config = {
  method: 'get',
  url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&units=imperial&key=${GOOGLE_MAPS_APIKEY}`,
  headers: { }
};

axios(config)
.then(function (response) {
  const data = response.data
  dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
})
.catch(function (error) {
  console.log(error);
});

    }

    getTravelTime();

  }, [origin, destination, GOOGLE_MAPS_APIKEY])
  return (
    <MapView
    ref={mapRef}
    style={tw`flex-1`}
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }}
    >

  {origin && destination && (
    <MapViewDirections 
     origin={origin.description}
     destination={destination.description}
     apikey={GOOGLE_MAPS_APIKEY}
     strokeWidth={3}
     strokeColor='black'
    />
  )}  

  {origin?.location && (
    <Marker 
    coordinate={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,

    }}
    title='Origin'
    description={origin.description}
    identifier='origin'
    />
  )}

  {destination?.location && (
    <Marker 
    coordinate={{
      latitude: destination.location.lat,
      longitude: destination.location.lng,

    }}
    title='Destination'
    description={destination.description}
    identifier='destination'
    />
  )}
  </MapView>

  )
}

export default Map