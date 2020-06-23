import React, { Component } from "react"
import { TextInput, Text, TouchableOpacity, ImageBackground } from "react-native"
import { View } from "native-base"
import { Header } from "react-native-elements"
import firebase from '../config/Firebase'
import 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropdownAlert from 'react-native-dropdownalert'



export default class Registeration extends Component {
    constructor() {
        super();
        this.usersRef = firebase.database().ref().child('Users');
        this.state = {
            username: "",
            password: "",
            verPassword: "",
            email: ""
        }
    }



    /**A function for the 'return' button to Login (returns the button). */
    returnButton() {
        return (
            <View style={{ alignSelf: "flex-end", right: "-20%", top: "-40%", width: "130%", height: "13%" }}>
                
                <TouchableOpacity
                    title="Return"
                    style={styles.returnButton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.returnButtonText}>חזור</Text>
                </TouchableOpacity>

            </View>
        )
    }


    /**A function for the 'sign-up' button (returns the button).  */
    signUpButton() {
        return (
            <View style={styles.buttonViewStyle}>

                <TouchableOpacity
                    title="SignUp"
                    style={styles.buttonStyle}
                    onPress={() => this.signUp()}
                >
                    <Text style={{ fontSize: 20, color: "#fff" }}>הרשם</Text>
                </TouchableOpacity>

            </View>
        )
    }

    /**A function that creates and adds a new user to the database.  */
    signUp() {
        if(this.validationError())
            return

        if(this.existingUserCheck())
            return;


        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.goToMap())
            .catch((error) => this.registrationError(error))

    }

    /**A function that checks if there's any input violation.
     * Returns true if there's any violation, else returns false.   */   
    validationError(){
        if (this.state.username === "" || this.state.password === "" || this.state.verPassword === "" || this.state.email === "") {
            this.dropDownAlertRef.alertWithType('warn', '', 'אנא מלא את כל השדות');
            return true;
        }

        if (this.state.password.length < 6) {
            this.dropDownAlertRef.alertWithType('warn', '', 'אנא הכנס סיסמא בעלת לפחות 6 תווים');
            return true;
        }

        if (this.state.password !== this.state.verPassword) {
            this.dropDownAlertRef.alertWithType('warn', '', 'הסיסמאות אינן תואמות');
            return true;
        }
        return false;
    }

    /**A function that checks if the user already exists.
     * Returns true if the user already exists, else returns false.*/
    existingUserCheck(){
        var userExists = false;                 
        this.usersRef.on('value', (users) => {
            users.forEach((user) => {
                if (user.val().username === this.state.username){
                    userExists = true;
                    return;
                }
            })
        })

        if (userExists) {
            this.dropDownAlertRef.alertWithType('warn', '', 'שם משתמש כבר קיים במערכת, אנא הכנס שם משתמש אחר');
            return true;
        }
        return false;
    }
    
    /**A function that adds the new user to the DB and navigates to the Map screen.  */
    goToMap(){
        var user = this.state.username;

        this.usersRef.push({                //Adding username and password to DB.
            email: this.state.email,
            username: this.state.username,
            type: "משתמש"
        })

        this.resetFields();
        this.props.navigation.navigate('Map', { user: user, btn: "התנתק", intro: "first time" })
    }

    /**A function that alerts the error type caused by failing to register. */
    registrationError(error){
        if (error.message === "The email address is already in use by another account.")
            this.dropDownAlertRef.alertWithType('warn', '', "דוא'ל זה הינו כבר רשום במערכת, אנא הכנס דוא'ל אחר");
        else if (error.message === "The email address is badly formatted.")
            this.dropDownAlertRef.alertWithType('warn', '', 'פורמט האימייל אינו תקין');
        else
            this.dropDownAlertRef.alertWithType('warn', '', 'קרתה תקלה, אנא נסה שנית');
    }

    
    resetFields() {
        this.setState({
            username: "",
            password: "",
            verPassword: "",
            email: ""
        })
    }



    render() {
        return (
            <View height="100%" width="100%" style={{ flex: 1 }}>

                <ImageBackground source={require('../Images/BackGround.jpg')} imageStyle={{ opacity: 0.15 }} style={{ flex: 1, height: "100%" }}>
                    
                    <KeyboardAwareScrollView enableOnAndroid="true" >

                        <Header
                            centerComponent={{ text: 'הרשמה', style: styles.centerComponentStyle }}
                            backgroundColor="#e6ffe6"
                            rightComponent={this.returnButton()}
                        />

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                textAlign="center"
                                placeholder={"שם משתמש"}
                                placeholderTextColor="#006400"
                                autoCorrect={false}
                                onChangeText={username => this.setState({ username })}
                                value={this.state.username}
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                textAlign="center"
                                placeholder={"סיסמא"}
                                placeholderTextColor="#006400"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                ref={(input) => { this.secondTextInput = input; }}
                                onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                textAlign="center"
                                placeholder={"אימות סיסמא"}
                                placeholderTextColor="#006400"
                                secureTextEntry={true}
                                autoCorrect={false}
                                onChangeText={verPassword => this.setState({ verPassword })}
                                value={this.state.verPassword}
                                ref={(input) => { this.thirdTextInput = input; }}
                                onSubmitEditing={() => { this.fourthTextInput.focus(); }}
                                blurOnSubmit={false}
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInputStyle}
                                textAlign="center"
                                placeholder={"אימייל"}
                                placeholderTextColor="#006400"
                                autoCorrect={false}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                ref={(input) => { this.fourthTextInput = input; }}
                                onSubmitEditing={() => this.signUp()}
                            />
                        </View>


                        <View>{this.signUpButton()}</View>

                    </KeyboardAwareScrollView>

                    <View style={{ position: "absolute", top: "0%", right: "25%", width: "50%", height: "40%" }}>
                        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                    </View>

                </ImageBackground>

            </View>
        )
    }
}



const styles = {
    inputView: {
        alignSelf: "center",
        paddingTop: "6%",
        height: "15%",
        width: "90%"
    },
    textInputStyle: {
        borderColor: "#006400",
        borderRadius: 15,
        borderWidth: 3,
        fontSize: 20,
        width: "80%",
        alignSelf: "center"
    },
    centerComponentStyle: {
        color: "#006400",
        fontWeight: "bold",
        fontSize: 30,
        top: -10
    },
    buttonViewStyle: {
        paddingTop: "15%",
        width: "50%",
        alignSelf: "center",
        borderColor: "grey",
    },
    buttonStyle: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#006400',
        borderColor: "#004577",
        borderWidth: 3,
        borderRadius: 10,
    },
    returnButton: {
        backgroundColor: '#006400',
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
    returnButtonText: {
        fontSize: 20,
        color: "#fff"
    }
}