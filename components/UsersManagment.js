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



    componentDidMount() {
        this.usersRef.on('child_added', () => this.getUpdatedList())
        this.usersRef.on('child_changed', () => this.getUpdatedList())
        this.usersRef.on('child_removed', () => this.getUpdatedList())
    }

    /**A function that gets all existing users except 'admin-masters' and put them into a list .  */
    getUpdatedList() {
        var list = [];
        var type;

        this.usersRef.orderByChild('username').on('value', (users) => {
            users.forEach((user) => {
                type = user.val().type;
                if (type === 'משתמש' || type === 'מנהל')
                    list.push(
                        <List.Item
                            title={user.val().username}
                            description={type}
                            left={props => <List.Icon {...props} icon={require('../Images/Account.png')} />}
                            onPress={() => this.changeUserConfirmation(user)}
                        />
                    )
            })
            this.setState({ usersList: list });
        })
    }


    /**A function for 'return' button to sign-out and transfer to the Login screen (returns the button).  */
    returnButton() {
        return (
            <View style={{ alignSelf: "flex-end", right: "-20%", top: "-40%", width: "130%", height: "13%" }}>

                <TouchableOpacity
                    title="Return"
                    style={styles.returnButton}
                    onPress={() => this.exitAdminScreen()}
                >
                    <Text style={styles.returnButtonText}>התנתק</Text>
                </TouchableOpacity>

            </View>
        )
    }

    exitAdminScreen() {
        firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(() => this.dropDownAlertRef.alertWithType('warn', '', "התנתקות נכשלה"))
    }

    /**A function for the "categories managment screen" button (returns the button). */
    toCategoriesButton() {
        return (
            <View style={styles.buttonViewStyle}>

                <TouchableOpacity
                    title="Return"
                    style={styles.buttonStyle}
                    onPress={() => this.props.navigation.navigate('CategoriesManagement')}
                >
                    <Text style={{color: "#fff", fontSize: 20}}>ניהול קטגוריות</Text>
                </TouchableOpacity>

            </View>
        )
    }


    changeUserConfirmation(user) {
        Alert.alert(
            'שים לב!',
            "האם אתה בטוח שברצונך לשנות את '" + user.val().username + "' ?",
            [
                { text: 'ביטול', style: 'cancel' },
                { text: 'שנה למנהל', onPress: () => this.changeUser(user, 'מנהל') },
                { text: 'שנה למשתמש', onPress: () => this.changeUser(user, 'משתמש') }
            ],
            { cancelable: false }
        );
    }

    /**A function that changes the user's type to an admin or a normal user */
    changeUser(userInfo, newType) {
        firebase.database().ref('Users/' + userInfo.key).set({
            email: userInfo.val().email,
            type: newType,
            username: userInfo.val().username
        })
    }



    render() {
        return (
            <View height="100%" width="100%" style={{ flex: 1 }}>

                
                <ImageBackground source={require('../Images/BackGround.jpg')} imageStyle={{ opacity: 0.15 }} style={{ flex: 1, height: "100%" }}>
                    
                    <KeyboardAwareScrollView enableOnAndroid="true" >
                        
                        <Header
                            centerComponent={{ text: 'ניהול משתמשים', style: styles.centerComponentStyle }}
                            backgroundColor="#e6ffe6"
                            rightComponent={this.returnButton()}
                        />

                        <View>{this.toCategoriesButton()}</View>

                        <List.Section>
                            <List.Subheader>לשינוי הרשאות - לחץ על שם משתמש</List.Subheader>
                            {this.state.usersList}
                            
                        </List.Section>

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
    centerComponentStyle: {
        color: "#006400",
        fontWeight: "bold",
        fontSize: 25,
        top: -10
    },
    buttonViewStyle: {
        paddingTop: "3%",
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
        fontSize: 13,
        color: "#fff"
    }
}