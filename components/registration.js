import React, { Component } from "react"
import { TextInput, Button, Alert, Text,TouchableOpacity,ImageBackground } from "react-native"
import { View } from "native-base"
import { Header } from "react-native-elements"
import firebase from '../config/Firebase'
import 'react-navigation'


export default class Registeration extends Component {
    constructor() {
        super();
        this.usersRef = firebase.firestore().collection('Users')
        this.state = {
            username: "",
            password: "",
            verPassword: "",
            email: ""
        }
    }


    returnButton(){

        return(
            <View style = {{alignSelf: "flex-end", right: "-20%", top: "-40%", width: "130%", height: "13%"}}>
                <TouchableOpacity
                    title = "Return"
                    style={styles.returnButton}
                    onPress = {()=>this.props.navigation.goBack()}
                >
                    <Text style = {styles.returnButtonText}>חזור</Text>
                </TouchableOpacity>
            </View>
        )
    }


    signUpButton(){

        return(
            <View style = {styles.buttonViewStyle}>
                <TouchableOpacity
                    title = "SignUp"
                    style={styles.buttonStyle}
                    onPress = {() =>this.signUp()}
                >
                <Text style = {{fontSize: 20, color: "#fff"}}>הרשם</Text>
                </TouchableOpacity>
            </View>
        )
    }

    signUp(){
        if(this.state.username === "" || this.state.password === ""|| this.state.verPassword === "" || this.state.email === ""){
            Alert.alert("אנא מלא את כל השדות");
            return;
        }
        if(this.state.password.length < 6){
            Alert.alert("אנא הכנס סיסמא בעלת לפחות 6 תווים");
            return;
        }
        if(this.state.password !== this.state.verPassword )
        {
            Alert.alert("הסיסמאות אינן תואמות");
            return;
        }

        //לבדוק שהמשתמש לא קיים ב'אוסף


        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(user){
            Alert.alert("נרשם בהצלחה");

            //לעבור למסך אחר עם פרמטר (מפות) כמשתמש רשום
        })
        .catch(function(error) {
            if(error.message === "The email address is already in use by another account.")
                Alert.alert("המייל רשום")
            else if(error.message === "The email address is badly formatted.")
                Alert.alert("פורמט האימייל אינו תקין")
            else
                Alert.alert("אנא נסה שנית");
            
        })
    }
    





    render(){
        return(
            <ImageBackground source={require ('../Images/BackGround.jpg')} imageStyle={{opacity:0.15}} style={{flex: 1,height:"100%"}}>
                
                <Header 
                    centerComponent = {{text: 'הרשמה' ,style: styles.centerComponentStyle }}
                    backgroundColor="#e6ffe6"
                    leftComponent = {this.returnButton()}
                />

                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"שם משתמש"}
                        placeholderTextColor = "#006400"
                        autoCorrect = {false}
                        onChangeText = {username => this.setState({ username })}
                        value = {this.state.username}
                    />
                </View>
                
                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"סיסמא"}
                        placeholderTextColor = "#006400"
                        secureTextEntry = {true}
                        autoCorrect = {false}
                        onChangeText = {password => this.setState({ password })}
                        value = {this.state.password}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"אימות סיסמא"}
                        placeholderTextColor = "#006400"
                        secureTextEntry = {true}
                        autoCorrect = {false}
                        onChangeText = {verPassword => this.setState({ verPassword })}
                        value = {this.state.verPassword}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"אימייל"}
                        placeholderTextColor = "#006400"
                        autoCorrect = {false}
                        onChangeText = {email => this.setState({ email })}
                        value = {this.state.email}
                    />
                </View>

                <View>{this.signUpButton()}</View>

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