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
    constructor() {
        super();
        this.categoryRef = firebase.database().ref().child('Categories');
        this.state = {
            category: "",
            list: null,
        };
    }

    componentWillMount() {
        this.getUpdatedList();
    }

    getUpdatedList(){
        var l = [];
        
        this.categoryRef.orderByValue().on('value', (snap) => {
            snap.forEach((child) => {
                l.push(
                    <List.Item
                        title={child.val()}
                        left={props => <List.Icon {...props} icon="camera" />}
                        onPress={() => this.categoryDeleteConfirmation(child)}
                    />
                )
            })
            this.setState({ list: l });
        })
    }


    categoryDeleteConfirmation(child) {
        Alert.alert(
            'שים לב!',
            "האם אתה בטוח שברצונך למחוק את '" + child.val() + "' ?",
            [
                {
                    text: 'ביטול',
                    style: 'cancel'
                },
                { text: 'מחק', onPress: () => this.categoryDelete(child.key) }
            ],
            { cancelable: false }
        );
    }


    categoryDelete(key){
        firebase.database().ref('Categories/' + key).remove()
        .then(()=> this.getUpdatedList())
        .catch(()=> alert("FAILED"))
    }


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

    addCategoryFunc() {
        if (this.state.category === '') {
            this.dropDownAlertRef.alertWithType('warn', '', "אנא הכנס שם קטגוריה להוספה")
            return;
        }
        var exist = false;
        this.categoryRef.on("value", (snap) => {
            snap.forEach((cat) => {
                    if(cat.val() === this.state.category){
                        exist = true;
                        return;
                    }
                })
        })
        if(exist){
            this.dropDownAlertRef.alertWithType('warn', '', "הקטגוריה כבר קיימת")
            this.setState({category : ""})
            return;
        }
        this.categoryRef.push(this.state.category);
        this.dropDownAlertRef.alertWithType('info', '', "קטגוריה נוספה בהצלחה!")
        this.getUpdatedList();
        this.setState({
            category: "",
        })
    }


    render() {
        return (
            <ImageBackground source={require('../Images/BackGround.jpg')} imageStyle={{ opacity: 0.15 }} style={{ flex: 1, height: "100%" }}>
                <KeyboardAwareScrollView enableOnAndroid="true" >

                    <Header
                        centerComponent={{ text: 'ניהול קטגוריות', style: styles.centerComponentStyle }}
                        backgroundColor="#e6ffe6"
                        rightComponent={this.returnButton()}
                    />
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
                <View style={{ position: "absolute", top: "0%", right: "25%", width: "50%", height: "40%"}}>
                    <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
                </View>
            </ImageBackground>
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
        fontSize: 20,
        color: "#fff"
    },
    centerComponentStyle: {
        color: "#006400",
        fontWeight: "bold",
        fontSize: 30,
        top: -10
    }
}