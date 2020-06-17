import React, { Component } from "react"
import { View, TouchableOpacity, Text, ImageBackground, Alert } from "react-native"
import { Header } from "react-native-elements"
import firebase from '../config/Firebase'
import 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { List } from "react-native-paper"
import DropdownAlert from 'react-native-dropdownalert'






export default class UsersManagment extends Component {

    constructor() {
        super();
        this.usersRef = firebase.database().ref().child('Users');
        this.state = {
            usersList: null
        }
    }


    returnButton() {
        return (
            <View style={{ alignSelf: "flex-end", right: "-20%", top: "-40%", width: "130%", height: "13%" }}>
                <TouchableOpacity
                    title="Return"
                    style={styles.returnButton}
                    onPress={() => this.props.navigation.goBack()}
                >
                    <Text style={styles.returnButtonText}>יציאה</Text>
                </TouchableOpacity>
            </View>
        )
    }

    componentWillMount() {
        this.getUpdatedList();
    }

    getUpdatedList() {
        var list = [];
        this.usersRef.orderByChild('username').on('value', (snap) => {
            snap.forEach((child) => {
                list.push(
                    <List.Item
                        title={child.val().username}
                        onPress={() => this.removeUserConfirmation(child)}
                    />
                )
            })
            this.setState({ usersList: list });
        })
    }
    removeUserConfirmation(child) {
        Alert.alert(
            'שים לב!',
            "האם אתה בטוח שברצונך למחוק את '" + child.val().username + "' ?",
            [
                {
                    text: 'ביטול',
                    style: 'cancel'
                },
                { text: 'מחק', onPress: () => this.removeUser(child) }
            ],
            { cancelable: false }
        );
    }

    removeUser(userInfo) {

        /*  
            
            need admin.auth().getUserByEmail()

        */

        //firebase.database().ref('Users/'+userInfo.key).remove();  .then()  .catch


        this.getUpdatedList();
    }




    render() {
        return (

            <ImageBackground source={require('../Images/BackGround.jpg')} imageStyle={{ opacity: 0.15 }} style={{ flex: 1, height: "100%" }}>
                <KeyboardAwareScrollView enableOnAndroid="true" >
                    <Header
                        centerComponent={{ text: 'ניהול משתמשים', style: styles.centerComponentStyle }}
                        backgroundColor="#e6ffe6"
                        rightComponent={this.returnButton()}
                    />



                    <List.Section>
                        <List.Subheader>למחיקה - לחץ על שם משתמש</List.Subheader>
                        {this.state.usersList}
                    </List.Section>


                </KeyboardAwareScrollView>
                <View style={{ position: "absolute", top: "0%", right: "25%", width: "50%", height: "40%" }}>
                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                </View>
            </ImageBackground>
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