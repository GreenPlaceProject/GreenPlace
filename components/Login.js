import React, {Component } from "react"
import {View, TextInput, Alert, Image, TouchableOpacity, Text, ImageBackground} from "react-native"

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            registered: false,                  
            pressed_login: false,
            pressed_register: false,
            pressed_as_a_guest: false,
            pressed_forgotten : false
        }
    } 



    forgotPasswordButton(){

        return (
            <View style = {{ width: "30%",left: "7%"}}>
                <TouchableOpacity
                    title = "forgotpassword"
                    onPress = {()=> this.forgotPassword()}
                >
                <Text style = {{fontSize: 15,color : "black"}}>שכחתי סיסמא</Text>
                </TouchableOpacity>
             </View>
        )
    }
    forgotPassword(){
        
    }


    LoginButton() {

        return (
            <View style = {styles.buttonViewStyle}>
                <TouchableOpacity
                    title = "signIn"
                    style={styles.buttonStyle}
                    onPress = {()=> this.login()}
                >
                <Text style = {styles.buttonTextStyle}>הכנס</Text>
                </TouchableOpacity>
            </View>
        )
    }
    login(){
        Alert.alert("לוודא תקינות קלט,לשנות ממצב אורח למשתמש");
    }


    registerButton() {

        return (
            <View style = {styles.buttonViewStyle}>
                <TouchableOpacity
                    title = "register"
                    style={styles.buttonStyle}
                    onPress = {()=> this.register()}
                >
                <Text style = {styles.buttonTextStyle}>הרשם</Text>
                </TouchableOpacity>
            </View>
        )
    }
    register(){
        Alert.alert("איפוס שדות");
    }

    guestButton(){

        return (
            <View style = {styles.buttonViewStyle}>
                <TouchableOpacity
                    title = "asAGuest"
                    style={styles.buttonStyle}
                    onPress = {()=> this.enterAsAGuest()}
                >
                <Text style = {styles.buttonTextStyle}>הכנס כאורח</Text>
                </TouchableOpacity>
            </View>
        )
    }
    enterAsAGuest(){
        Alert.alert("איפוס שדות");
    }





    render() {
        return(
            <View height = "100%" width = "100%">
                <Image
                    source={require ("../Images/App_Logo.jpg")}
                    style={styles.image}
                />

                <ImageBackground source={require ('../Images/BackGround.jpg')} imageStyle={{opacity:0.15}} style={{flex: 1,height:"100%"}}>
                <View style = {styles.InputView}>
                    <TextInput style = {styles.textInputStyle}
                        placeholder = "שם משתמש"
                        placeholderTextColor = "#006400"
                        autoCorrect = {false}
                        onChangeText = {username => this.setState({ username })}
                        value = {this.state.username}
                    />
                </View>

                <View style = {styles.inputView}>
                    <TextInput style = {styles.textInputStyle}
                        placeholder = "סיסמא"
                        placeholderTextColor = "#006400"
                        autoCorrect = {false}
                        secureTextEntry = {true}
                        onChangeText = {password => this.setState({ password })}
                        value = {this.state.password}
                    />
                </View>
                    
                <View>{this.forgotPasswordButton()}</View>
                <View>{this.LoginButton()}</View>
                <View>{this.registerButton()}</View>
                <View>{this.guestButton()}</View>

                </ImageBackground>
            </View>
        )
    }
}








const styles = {
    image: {
        height: "25%",
        width: "100%",
        alignSelf: "center",
        marginBottom: "5%", 
        paddingBottom: "9%",
        resizeMode: "stretch"
    },

    inputView :{
        paddingTop: "6%",  
    },
    textInputStyle: {
        borderColor: "#006400",
        borderRadius: 15,
        borderWidth: 3,
        fontSize: 20,
        width: "80%",
        alignSelf: "center",
        textAlign: 'center'
    },

    buttonViewStyle: {
        paddingTop: "5%",
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
    buttonTextStyle:{
        fontSize: 20,
        color: "#fff"
    }
}




export default Login;