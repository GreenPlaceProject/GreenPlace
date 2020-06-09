import React, { Component } from "react"
import { Text,TouchableOpacity,Picker} from "react-native"
import { View } from "native-base"
import { Header} from "react-native-elements"
import MapView , {PROVIDER_GOOGLE, Callout} from 'react-native-maps'


class Map extends Component{
    constructor() {
        super();
        this.state = {
            pickerSelectedLabel:''

        };
    }

    show=(value)=>
    {
        this.setState({pickerSelectedLabel:value});
    }

    render(){
        return(
            <View>
                <Header 
                    backgroundColor="#e6ffe6"
                    rightComponent = { <TouchableOpacity
                                            title = "signIn"
                                            style={styles.returnButton}
                                        >
                                        <Text style = {styles.returnButtonText}>התנתק</Text>
                                        </TouchableOpacity>


                    }   
                >  
                </Header>
                <View style={{width:245 , left:15}}>
                    <Picker 
                        selectedValue={this.state.pickerSelectedLabel}
                        onValueChange={this.show.bind()}
                        style={{position:'absolute',left:0 , bottom:10 , right:5}}>
                        <Picker.Item label="בחר קטגוריה" value="1" ></Picker.Item>
                        <Picker.Item label="אתר פריחה" value="2"></Picker.Item>
                        <Picker.Item label="אתר צפרות וצפיית חיות בר" value="3"></Picker.Item>
                        <Picker.Item label="גינה ציבורית" value="4"></Picker.Item>
                        <Picker.Item label="גינה קהילתית" value="5"></Picker.Item>
                        <Picker.Item label="חנות אופניים" value="6"></Picker.Item>
                        <Picker.Item label="חנות טבע" value="7"></Picker.Item>
                        <Picker.Item label="חנות יד שניה" value="8"></Picker.Item>
                        <Picker.Item label="ספריית רחוב" value="9"></Picker.Item>
                        <Picker.Item label="עץ פרי" value="10"></Picker.Item>
                        <Picker.Item label="פח מיחזור" value="11"></Picker.Item>
                        <Picker.Item label="צמח מאכל ומרפא" value="12"></Picker.Item>
                        <Picker.Item label="קומפוסטר" value="13"></Picker.Item>                       
                    </Picker>
                    
                </View>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 31.756106,
                            longitude: 35.165088,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.001
                        }}
                        onPress={ (event) =>
                        alert("latitude:"+event.nativeEvent.coordinate.latitude+"\nlongitude:"+event.nativeEvent.coordinate.longitude ) }>
                        
                    </MapView>
                </View>
            </View>
        )
    }

}

export default Map;

const styles = {
    buttonTextStyle:{
        fontSize : 20,
        color : "white",
    },

    returnButton:{
        backgroundColor:'#006400',
        color: "#fff",
        borderRadius: 26,
        fontSize: 20,
        width: 60,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 35,
        left: -10,
        top: -10
    },

    returnButtonText:{
        fontSize : 15,
        color : "white",
    },

    map: {
        height:'100%'
    },

}