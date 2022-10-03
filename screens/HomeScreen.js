import React from 'react'
import {useDispatch} from 'react-redux'
import { setOrigin, setDestination } from '../slices/navSlice';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, StyleSheet, SafeAreaView, Platform, Image} from 'react-native'
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import NavFavourites from '../components/NavFavourites';
import { GOOGLE_MAPS_APIKEY } from "@env";


const HomeScreen = () => {
    //resizeMode: "contain" - this will resize the image to the size height and width set to the image.
    const dispatch = useDispatch()
    
    
    return (
        <SafeAreaView style={[tw`bg-white h-full`, styles.container]}>
            <View style={tw`p-5`}>
                <Image style={{width: 100, height:100, resizeMode: "contain"}} source={{uri: "https://links.papareact.com/gzs"}}/>
                <GooglePlacesAutocomplete
                    placeholder='Where From?'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        dispatch(setOrigin({
                            location:details.geometry.location,
                            description: data.description,
                        }))
                        dispatch(setDestination(null))
                    }}
                    returnKeyType = {"search"}
                    styles={{
                        container: {
                            flex:0,
                        },
                        textInput: {
                            fontSize: 18,
                        }
                    }}
                    enablePoweredByContainer={false}
                    minLength={2}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: 'en',
                    }}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={100}
                />
                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //backgroundColor: npLBlue,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    text: {
        color: 'blue',
    },
});