import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';


const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center text-xl`}>Good Morning Sujith...</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
              <GooglePlacesAutocomplete 
                    placeholder='Where to?'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description
                    }))

                    navigation.navigate("RideOptionsCard")
                    }}
                    returnKeyType = {"search"}
                    styles={{
                    container: {
                        backgroundColor: "white",
                        paddingTop: 20,
                        flex: 0,
                        },
                    textInput: {
                        backgroundColor: "#E8E8E8",
                        borderRadius: 0,
                        fontSize: 18,
                        },
                    textInputContainer: {
                        paddingHorizontal:20,
                        paddingBottom: 0,
                        }
                    }}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                        }}
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400}
              />
          </View>
      <NavFavourites />
      </View>

      <View style={tw`flex-row justify-evenly py-2 bg-white mt-auto border-t border-gray-100`}>
          <TouchableOpacity style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`}
          onPress={() => navigation.navigate('RideOptionsCard')}
          >
              <Icon name="car" type="font-awesome" color="white" size={26}/>
              <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex flex-row w-24 px-4 py-3 rounded-full`}>
              <Icon name="car" type="font-awesome" color="black" size={26}/>
              <Text style={tw`text-center`}>Rides</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard