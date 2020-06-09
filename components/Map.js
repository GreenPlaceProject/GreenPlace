import React, { Component } from "react"
import { Text,TouchableOpacity,Picker} from "react-native"
import { View, Button } from "native-base"
import { Header} from "react-native-elements"
import MapView , {PROVIDER_GOOGLE,Marker, Callout} from 'react-native-maps'
import firebase from '../config/Firebase'


class Map extends Component{
    constructor() {
        super();
        this.state = {
            pickerSelectedLabel:''

        };
    }

    func(){
        <Marker
            coordinate={{latitude:31.756106, longitude:35.165088}}
        ></Marker>  
    }



    show=(value)=>
    {
        this.setState({pickerSelectedLabel:value});
    }

    /*func()
    {
        firebase.firestore().collection('Users').add({
            Name: "something"
        })
        .then(function(){ Alert.alert("ok"); })

        firebase.firestore().collection('Users').doc('IDAN').set({
            Name: "idan",
            email: "idan@co.com"
        })
        .then(function (){ Alert.alert("no"); })
    }*/

    render(){
        return(
            <View>
                <Header 
                    backgroundColor="#e6ffe6"
                    leftComponent = { <TouchableOpacity
                                            title = "signIn"
                                            style={styles.returnButton}
                                            //onPress={()=>this.func()}
                                        >
                                        <Text style = {styles.returnButtonText}>התנתק</Text>
                                        </TouchableOpacity>


                    }   
                >  
                </Header>
                <View style={{width:300 , left:75}}>
                    <Picker 
                        selectedValue={this.state.pickerSelectedLabel}
                        onValueChange={this.show.bind()}
                        style={{position:'absolute',left:0 , bottom:10 , right:5}}>
                        <Picker.Item label="בחר קטגוריה" value="1" ></Picker.Item>
                        <Picker.Item label="עץ פרי" value="2"></Picker.Item>
                        <Picker.Item label="צמח מאכל ומרפא" value="3"></Picker.Item>
                        <Picker.Item label="גינה ציבורית" value="4"></Picker.Item>
                        <Picker.Item label="חנות יד שניה" value="5"></Picker.Item>
                        <Picker.Item label="גינה קהילתית" value="6"></Picker.Item>
                        <Picker.Item label="אתר פריחה" value="7"></Picker.Item>
                        <Picker.Item label="ספריית רחוב" value="8"></Picker.Item>
                        <Picker.Item label="חנות טבע" value="9"></Picker.Item>
                        <Picker.Item label="קומפוסטר" value="10"></Picker.Item>
                        <Picker.Item label="פח מיחזור" value="11"></Picker.Item>
                        <Picker.Item label="אתר צפרות וצפיית חיות בר" value="12"></Picker.Item>
                        <Picker.Item label="חנות אופניים" value="13"></Picker.Item>
                    </Picker>
                    
                </View>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 31.758106,
                            longitude: 35.165088,
                            latitudeDelta: 0.04,
                            longitudeDelta: 0.001
                        }}
                        onPress={()=>this.func()}
                        >
                        <Marker
                            coordinate={{latitude: 31.756106,
                                        longitude: 35.165088,}}>
                            <Callout>
                                <Button title="jhg"></Button>
                            </Callout>
                        </Marker>
                    </MapView>
                </View>
            </View>
        )
    }
    //<MapView.Marker coordinate={{ latitude:event.nativeEvent.coordinate.latitude,longitude:event.nativeEvent.coordinate.longitude}}></MapView.Marker>
/*"latitude:"+event.nativeEvent.coordinate.latitude+"\nlongitude:"+event.nativeEvent.coordinate.longitude*/
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