import React, { Component } from "react"
import { TextInput, Button, Alert, Text,TouchableOpacity,ImageBackground } from "react-native"
import { View } from "native-base"
import { Header } from "react-native-elements"

export default class Registeration extends Component {
    constructor() {
        super();
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
                    onPress = {()=>this.goBack()}
                >
                    <Text style = {styles.returnButtonText}>חזור</Text>
                </TouchableOpacity>
            </View>
        )
    }
    goBack(){
        Alert.alert("איפוס שדות")
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
        Alert.alert("לבדוק תקינות קלט ואיפוס שדות אחרי הוספה")
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