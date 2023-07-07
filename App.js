import { View, Text, SafeAreaView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import axios from 'axios'

import * as Animatable from 'react-native-animatable';

Ionicons.loadFont();
MaterialCommunityIcons.loadFont();

// const BASE_URL = 'https://api.openweathermap.org/data/2.5'


const App = () =>  {

  const [city, setCity] = useState('');
  const [show, setShow] = useState(false);
  const API_KEY = '9ab25ad6ae424644be7220113230707'
  const BASE_URL = 'https://api.weatherapi.com/v1'

  const [data, setData] = useState(null);

  const handleSearch =  () => {
    axios.get (`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`) // link parametresi
    .then (res => {  
          setShow(!show)
          setData(res.data)
          console.log(data?.current.condition.icon.substring(2))
      })
  }

  const changeCityText = (e) => {
    setCity(e)
    setShow(false)
  }

  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  handleViewRef = ref => this.view = ref;

  return(
    <View style={styles.container} >  
    <SafeAreaView>
        <View style={styles.bodyWrapper}>
          <View style={styles.searchWrapper} >
            <View style={styles.searchInputWrapper}>
              <Ionicons name="location" size={24} />
                <TextInput
                style={styles.locationInput}
                onChangeText={changeCityText}
                value={city}
                placeholder="Enter Your Location"
                placeholderTextColor={'black'}
              />
            </View>
            <View style={styles.submitButtonWrapper}>
              <TouchableOpacity onPress={handleSearch} >
                <Ionicons name="search" size={24} />
              </TouchableOpacity>
            </View>
          </View>

          {
          show ? 
          <Animatable.View animation={fadeIn} ref={this.handleViewRef} style={styles.weatherWrapper} >
            <View style={styles.statusWrapper}>
              <Image src={'https://'+data?.current.condition.icon.substring(2)} style={styles.statusImage} />
              <View style={{paddingVertical: 10, justifyContent:'center', alignItems: 'center'}}>
                <Text style={{fontWeight: '800', fontSize: 20 }}>{data?.current.temp_c} °</Text>
                <Text style={{fontWeight: '400', fontSize: 20 }}>{data?.current.condition.text}</Text>
              </View>
            </View>

            <View style={styles.infoWrapper}>
                <View style={styles.infoItemWrapper}>
                  <MaterialCommunityIcons name="weather-tornado" size={24} />
                  <View style={{marginLeft:5}}>
                    <Text>{data?.current.humidity}%</Text>
                    <Text>Humidity</Text>
                  </View>
                </View>

                <View style={styles.infoItemWrapper}>
                  <MaterialCommunityIcons name="weather-windy" size={24} />
                  <View style={{marginLeft:5}}>
                    <Text>{data?.current.wind_kph}Km/h</Text>
                    <Text>Wind Speed</Text>
                  </View>
                </View>

            </View>
          </Animatable.View> : null}
          
        </View>
        
    </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
      flex: 1,
      backgroundColor: '#339FFF',
      justifyContent: 'center',
      alignItems: 'center'
    },

    bodyWrapper: {
      width: 300,
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },
    searchWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    searchInputWrapper: {
      flexDirection: 'row',
    },

    locationInput: {
       marginLeft: 10,
    },

    submitButtonWrapper: {
      backgroundColor: '#339FFF',
      opacity: .8,
      width: 30,
      height: 30,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },

    weatherWrapper: {
      marginTop: 20,
    },

    statusImage: {
      marginTop: 5,
      width : 150,
      height: 150,
    },

    statusWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: .5,
      borderColor: '#339FFF',
      borderRadius: 10,
    },

    infoWrapper: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    infoItemWrapper: {
      flexDirection: 'row',
      alignItems: 'center'
    }

  }

)

export default App;