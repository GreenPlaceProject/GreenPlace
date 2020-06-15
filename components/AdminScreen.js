import React, { Component } from "react"
import { TextInput, Text, TouchableOpacity, ImageBackground } from "react-native"
import { View } from "native-base"
import { Header } from "react-native-elements"
import firebase from '../config/Firebase'
import 'react-navigation'
import Snackbar from 'react-native-snackbar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class AdmitScreen extends Component {

    returnButton(){
        return(
            <View style = {{alignSelf: "flex-end", right: "-20%", top: "-40%", width: "130%", height: "13%"}}>
                <TouchableOpacity
                    title = "Return"
                    style={styles.returnButton}
                    onPress = {()=>this.props.navigation.goBack()}
                >
                    <Text style = {styles.returnButtonText}>יציאה</Text>
                </TouchableOpacity>
            </View>
        )
    }


    addCategory(){
        //firebase.database().ref().child('Places').push('גינה ציבורית')
        firebase.database().ref().child('Users').push({
            email: "t@t.com",
            username: "ttt"
        })
    }



    render() {
        return (

            <ImageBackground source={require('../Images/BackGround.jpg')} imageStyle={{ opacity: 0.15 }} style={{ flex: 1, height: "100%" }}>
                <KeyboardAwareScrollView enableOnAndroid="true" >
                    <Header
                        centerComponent={{ text: 'דף אדמין', style: styles.centerComponentStyle }}
                        backgroundColor="#e6ffe6"
                        rightComponent={this.returnButton()}
                    />
                    <TouchableOpacity
                        title = "Return"
                        style={styles.returnButton}
                        onPress = {()=>this.addCategory()}
                    >
                        <Text style = {styles.returnButtonText}>הוספה</Text>
                    </TouchableOpacity>
                    

                </KeyboardAwareScrollView>
            </ImageBackground>
        )
    }
}

const styles = {
    inputView: {
        alignSelf : "center",
        paddingTop: "6%",
        height : "15%",
        width : "90%"
    },
    textInputStyle: {
        borderColor: "#006400",
        borderRadius: 15,
        borderWidth: 3,
        fontSize: 20,
        width: "80%",
        alignSelf: "center"
    },
    centerComponentStyle:{
        color: "#006400",
        fontWeight: "bold",
        fontSize:30,
        top:-10
    },
    buttonViewStyle: {
        paddingTop: "15%",
        width: "50%",
        alignSelf : "center",
        borderColor : "grey",
    },
    buttonStyle:{
        height : 45,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#006400',
        borderColor: "#004577",
        borderWidth:3,
        borderRadius: 10,   
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
        left: -10
    },
    returnButtonText:{
        fontSize: 20, 
        color: "#fff"
    }
}