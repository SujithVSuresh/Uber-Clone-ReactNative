import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import tw from 'tailwind-react-native-classnames'


const NavFavourites = () => {

    const data = [
        {
            id: "123",
            icon: "home",
            location: "Home",
            destination: "Code Street, London, UK",
        },
        {
            id: "456",
            icon: "briefcase",
            location: "Work",
            destination: "LOndon tye, London, UK",
        },
    ]
  return (
    <FlatList data={data} 
    keyExtractor={( item ) => item.id} 
    ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-300`, {height: 0.5}]}/>
    )}
    renderItem={({item:{location, destination, icon}}) => (
        <TouchableOpacity style={tw`flex-row p-4 items-center`}>
            <Icon 
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type='ionicon'
            color='white'
            size={18}
            />
            <View>
                <Text style={tw`font-semibold text-lg`}>{location}</Text>
                <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
        </TouchableOpacity>
    )}/>
  )
}

export default NavFavourites