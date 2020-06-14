import React, { Component } from "react"
import { Text,TouchableOpacity,Picker, Alert} from "react-native"
import { View, Button } from "native-base"
import { Header} from "react-native-elements"
import MapView , {PROVIDER_GOOGLE,Marker, Callout} from 'react-native-maps'
import firebase from '../config/Firebase'
import 'react-navigation'
import { NavigationContext } from "react-navigation"
import { color } from "react-native-reanimated"

class Map extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pickerSelectedLabel:'',
            latitude:'',
            longitude:''
        };
    }

    /*func(){
        return     (    <Marker
        coordinate={{latitude:31.756106, longitude:35.165088}}
    ></Marker> )
 
    }*/

    next(){

    }



    show=(value)=>
    {
        this.setState({pickerSelectedLabel:value});
    }

    function(event){
        this.setState({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
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

    headerButton()
    {
        return(<TouchableOpacity
                title = "signOut"
                style={styles.returnButton}
                onPress={()=>this.buttonUser()}>
                <Text style = {styles.returnButtonText}>{this.props.navigation.state.params.btn}</Text>
            </TouchableOpacity>)
    }

    buttonUser()
    {
        if(this.props.navigation.state.params.user === "")
            this.props.navigation.goBack();
        else
            firebase.auth().signOut()
            .then(()=>{
                Alert.alert("ההתנתקות הצליחה")
                this.props.navigation.navigate('Login')
            })
            .catch(()=> Alert.alert("ההתנתקות נכשלה"));

        //this.props.navigation.navigate('AddLocation', {latitude:this.state.latitude, longitude:this.state.longitude});
    }

    render(){
        return(
            <View>
                <Header 
                    backgroundColor="#e6ffe6"
                    rightComponent = {()=>this.headerButton()}
                >  
                </Header>
                <View style={{width:"70%" , left:"1%"}}>
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
                        //onPress={()=>this.func()}
                        >
                       <Marker
                            coordinate={{latitude:31.756106, longitude:35.165088}}>

                            <Callout onPress={()=>this.props.navigation.navigate('AddLocation')}><Button><Text>הוספת מקום</Text></Button></Callout>
                        </Marker> 

                        <Marker
                            coordinate={{latitude:31.756806, longitude:35.165088}}>

                            <Callout onPress={()=>this.props.navigation.navigate('AddLocation')}><Button><Text>הוספת מקום</Text></Button></Callout>
                        </Marker> 

                        <Marker
                            coordinate={{latitude:31.756106, longitude:35.165988}}>

                            <Callout onPress={()=>this.props.navigation.navigate('AddLocation')}><Button><Text>הוספת מקום</Text></Button></Callout>
                        </Marker> 

                        <Marker
                            coordinate={{latitude:31.756306, longitude:35.165988}}>

                            <Callout><Text>גינה קהילתית</Text></Callout>
                        </Marker> 

                        <Marker
                            coordinate={{latitude:31.756106, longitude:35.166988}}>

                            <Callout><Text>חנות טבע</Text></Callout>
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