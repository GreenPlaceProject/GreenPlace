import React, {Component } from "react"
import {View, TextInput, Image, TouchableOpacity, Text, ImageBackground} from "react-native"
import firebase from '../config/Firebase'
import 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropdownAlert from 'react-native-dropdownalert'

export default class Login extends Component {

    constructor() {
        super();
        this.usersRef = firebase.database().ref().child('Users');
        this.state = {
            email: "",
            password: "",                  
            pressed_login: false,
            pressed_register: false,
            pressed_as_a_guest: false
        }
    } 


        //A function returning TouchableOpacity for 'forgot password' button
    forgotPasswordButton(){
        return (
            <View style = {{ width: "30%",left: "67%"}}>
                <TouchableOpacity
                    title = "forgotpassword"
                    onPress = {()=> this.forgotPassword()}
                >
                <Text style = {{fontSize: 15,color : "black"}}>שכחתי סיסמא</Text>
                </TouchableOpacity>
             </View>
        )
    }
        //Forgot password function
    forgotPassword(){

        if(this.state.email === ""){
            this.dropDownAlertRef.alertWithType('warn', '', "אנא הכנס דוא'ל");
            return;
        }

        firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(() => this.dropDownAlertRef.alertWithType('info', '', 'מייל לאיפוס סיסמא נשלח בהצלחה'))
        .catch(() => this.dropDownAlertRef.alertWithType('info', '', 'מייל לאיפוס סיסמא נשלח בהצלחה'))
        this.resetFields();
    }

        //A function returning TouchableOpacity for 'Login' button
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

        //Login and input validation checks function
    login(){    

        if(this.state.email === "" | this.state.password === "")
        {
            this.dropDownAlertRef.alertWithType('warn', '', "אחד או יותר מהשדות ריקים")
            return;
        } 

        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(() =>{ 
            this.usersRef.on('value',(snap)=>{
                snap.forEach((child) =>{
                    if(child.val().email === this.state.email){
                        this.resetFields();
                        this.props.navigation.navigate('Map',{user : child.val().username, btn : "התנתק"})                        
                    }
                })
            })
        })
        .catch(() => this.dropDownAlertRef.alertWithType('warn', '', "המייל או הסיסמא אינם נכונים"))
    }

        //A function returning TouchableOpacity for 'Register' button
    registerButton() {

        return (
            <View style = {styles.buttonViewStyle}>
                <TouchableOpacity
                    title = "register"
                    style={styles.buttonStyle}
                    onPress = {()=> this.registerTransfer()}
                >
                <Text style = {styles.buttonTextStyle}>הרשם</Text>
                </TouchableOpacity>
            </View>
        )
    }


    registerTransfer(){
        this.resetFields();
        this.props.navigation.navigate('Registration');
    }

        //A function returning TouchableOpacity for 'Enter as a Guest' button
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
        this.resetFields();
        this.props.navigation.navigate('Map',{ user : "" , btn : "חזור"})
    }




    adminButton(){
        return (
            <View style = {styles.buttonViewStyle}>
                <TouchableOpacity
                    title = "admin"
                    style={styles.buttonStyle}
                    onPress = {()=> this.toAdminPage()}
                >
                <Text style = {styles.buttonTextStyle}>כניסה לאדמין</Text>
                </TouchableOpacity>
            </View>
        )
    }

    toAdminPage(){
        this.props.navigation.navigate('CategoriesManagement');
    }








    resetFields(){
        this.setState({
            email: '',
            password: '',                  
            pressed_login: false,
            pressed_register: false,
            pressed_as_a_guest: false,
            pressed_forgotten : false
        })
    }



    render() {
        return(
            <View height = "100%" width = "100%" style = {{flex:1}}>
                <Image
                    source={require ("../Images/App_Logo.jpg")}
                    style={styles.image}
                />

                <ImageBackground source={require ('../Images/BackGround.jpg')} imageStyle={{opacity:0.15}} style={{flex: 1,height:"100%"}}>

                    <KeyboardAwareScrollView enableOnAndroid = "true" >
                    
                        <View style = {styles.InputView}>
                            <TextInput style = {styles.textInputStyle}
                                placeholder = "דוא'ל"
                                placeholderTextColor = "#006400"
                                autoCorrect = {false}
                                onChangeText = {email => this.setState({ email })}
                                value = {this.state.email}       
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}        
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
                                ref={(input) => { this.secondTextInput = input; }}
                                onSubmitEditing={ () => this.login() }
                            />
                        </View>
                        
                        <View>{this.forgotPasswordButton()}</View>  
                        <View>{this.LoginButton()}</View>
                        <View>{this.registerButton()}</View>
                        <View>{this.guestButton()}</View>
                        <View>{this.adminButton()}</View>

                    </KeyboardAwareScrollView>
                </ImageBackground>
                <View style={{ position: "absolute", top: "0%", right: "25%", width: "50%", height: "40%"}}>
                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                </View>
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