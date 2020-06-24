import React, { Component } from "react"
import { TextInput, View, TouchableOpacity, Text, ImageBackground, Alert } from "react-native"
import { Header } from "react-native-elements"
import firebase from '../config/Firebase'
import 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { List } from "react-native-paper"
import DropdownAlert from 'react-native-dropdownalert'
import 'react-native-vector-icons'


export default class CategoriesManagement extends Component {
    constructor(props) {
        super(props);
        this.categoryRef = firebase.database().ref().child('Categories');
        this.state = {
            category: "",
            list: null,
        };
    }

 

    componentDidMount() {
        this.categoryRef.on('child_added', () => this.getUpdatedList())
        this.categoryRef.on('child_changed', () => this.getUpdatedList())
        this.categoryRef.on('child_removed', () => this.getUpdatedList())
    }

    /**A function that gets all existing categories and put them into a list.  */
    getUpdatedList() {
        var l = [];

        this.categoryRef.orderByValue().on('value', (categories) => {
            categories.forEach((category) => {
                l.push(
                    <List.Item
                        title={category.val()}
                        left={props => <List.Icon {...props} icon={require('../Images/File.png')} />}
                        onPress={() => this.categoryDeleteConfirmation(category)}
                    />
                )
            })
            this.setState({ list: l });
        })
    }

    categoryDeleteConfirmation(category) {
        Alert.alert(
            'שים לב!',
            "האם אתה בטוח שברצונך למחוק את '" + category.val() + "' ?",
            [
                { text: 'ביטול', style: 'cancel' },
                { text: 'מחק', onPress: () => this.categoryDelete(category.key) }
            ],
            { cancelable: false }
        );
    }

    /**A function that removes the selected category from the DB.  */
    categoryDelete(key) {
        firebase.database().ref('Categories/' + key).remove()
            .then(() => this.dropDownAlertRef.alertWithType('success', '', "קטגוריה נמחקה"))
            .catch(() => this.dropDownAlertRef.alertWithType('error', '', "מחיקה נכשלה"))
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
            .then(() => {
                this.props.navigation.navigate('Login')
            })
            .catch(() => this.dropDownAlertRef.alertWithType('warn', '', "התנתקות נכשלה"))
    }

    /**A function for the "users managment screen" button (returns the button). */
    toUsersButton() {
        return (
            <View style={{ paddingTop: "3%", width: "50%", alignSelf: "center", borderColor: "grey" }}>

                <TouchableOpacity
                    title="Return"
                    style={{ height: 45, alignItems: 'center', justifyContent: 'center', backgroundColor: '#006400', borderColor: "#004577", borderWidth: 3, borderRadius: 10, }}
                    onPress={() => this.toUsersManagment()}
                >
                    <Text style={styles.buttonTextStyle}>ניהול משתמשים</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
    
    /**A function that transfers the user to the user managment screen if the user has permissions. */
    toUsersManagment() {
        if (this.props.navigation.state.params.adminType === 'master')
            this.props.navigation.navigate('UsersManagment')
        else
            this.dropDownAlertRef.alertWithType('error', '', "למשתמש זה חסרות הרשאות");
    }

    /**A function for the "add category" button (returns the button). */
    addCategoryBtn() {
        return (
            <View style={styles.buttonViewStyle}>

                <TouchableOpacity
                    title="add"
                    style={styles.buttonStyle}
                    onPress={() => this.addCategoryFunc()}
                >
                    <Text style={styles.buttonTextStyle}>הוסף קטגוריה</Text>
                </TouchableOpacity>

            </View>
        )
    }

    /**A function that adds a new category to the DB. */
    addCategoryFunc() {
        if (this.state.category === '') {
            this.dropDownAlertRef.alertWithType('warn', '', "אנא הכנס שם קטגוריה להוספה")
            return;
        }

        if(this.invalidCategoryCheck())
            return;
        
        this.categoryRef.push(this.state.category);
        this.dropDownAlertRef.alertWithType('info', '', "קטגוריה נוספה בהצלחה!")
        this.setState({ category: "" })
    }

    /**A function that checks if the category input is valid.
     * Returns true if the category already exists or its a default one, else returns false. */
    invalidCategoryCheck(){
        if(this.state.category === "אחר" || this.state.category === 'בחר קטגוריה'){
            this.dropDownAlertRef.alertWithType('warn', '', "לא ניתן להוסיף קטגוריה דיפולטיבית זאת")
            this.setState({ category: "" })
            return true;
        }

        var exist = false;
        this.categoryRef.on("value", (categories) => {
            categories.forEach((category) => {
                if (category.val() === this.state.category) {
                    exist = true;
                    return;
                }
            })
        })

        if (exist) {
            this.dropDownAlertRef.alertWithType('warn', '', "הקטגוריה כבר קיימת")
            this.setState({ category: "" })
            return true;
        }

        return false;
    }



    render() {
        return (
            <View height="100%" width="100%" style={{ flex: 1 }}>
                
                <ImageBackground source={require('../Images/BackGround.jpg')} imageStyle={{ opacity: 0.15 }} style={{ flex: 1, height: "100%" }}>
                    
                    <KeyboardAwareScrollView enableOnAndroid="true" >

                        <Header
                            centerComponent={{ text: 'ניהול קטגוריות', style: styles.centerComponentStyle }}
                            backgroundColor="#e6ffe6"
                            rightComponent={this.returnButton()}
                        />

                        <View>{this.toUsersButton()}</View>

                        <View>

                            <View>{this.addCategoryBtn()}</View>

                            <View style={{ position: "absolute", paddingTop: "8%", width: "55%", left: "2%", borderColor: "grey", }}>
                                <TextInput style={{ borderColor: "#006400", borderRadius: 15, borderWidth: 3, fontSize: 20, width: "80%", height: "85%", alignSelf: "center", textAlign: 'center' }}
                                    placeholder="שם קטגוריה"
                                    placeholderTextColor="#006400"
                                    autoCorrect={false}
                                    onChangeText={category => this.setState({ category })}
                                    value={this.state.category}
                                    onSubmitEditing={() => this.addCategoryFunc()}
                                />
                            </View>

                        </View>

                        <List.Section>
                            <List.Subheader>למחיקה - לחץ על קטגוריה</List.Subheader>
                            {this.state.list}
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
    buttonViewStyle: {
        paddingTop: "5%",
        width: "40%",
        left: "55%",
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
    buttonTextStyle: {
        fontSize: 20,
        color: "#fff"
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
    },
    centerComponentStyle: {
        color: "#006400",
        fontWeight: "bold",
        fontSize: 25,
        top: -10,
    }
}