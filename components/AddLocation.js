import React, { Component } from "react";
import { View , TextInput , Text , ImageBackground , Picker, TouchableOpacity,Alert } from "react-native";
import { Header } from "react-native-elements"
import InputScrollView from 'react-native-input-scroll-view';

import 'react-navigation'


class AddLocationForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            place: "",
            description: "",
            selectedLabel: "1"
        }
    }

    Show=(value)=>{
        this.setState({selectedLabel:value});
    }

    backButton(){
        return (
            <View style = {{alignSelf: "flex-end", right: "-20%", top: "-40%", width: "130%", height: "13%"}}>
                <TouchableOpacity
                    title = "Back"
                    style = {styles.backButtonStyle}
                    onPress = {()=> this.goBack()}
                >
                    <Text style = {{fontSize: 20, color: "#fff"}}>חזור</Text> 
                </TouchableOpacity>
            </View>
        )
    }
    goBack(){
        this.resetFields();
        this.props.navigation.goBack();
    }

    updateButton(){
        return (
            <View style = {styles.buttonViewStyle}>
                <TouchableOpacity
                    title = "AddALocation"
                    style = {styles.buttonStyle}
                    onPress = {()=> this.update()}
                >
                    <Text style = {{fontSize: 20, color: "#fff"}}>עדכן</Text>
                </TouchableOpacity>
            </View>
        )
    }
    update(){
        //Alert.alert(""+this.props.navigation.state.params.latitude); בדיקת הגעת משתנים
        if(this.state.place === "" || this.state.selectedLabel === "1"){
            Alert.alert("אנא מלא את כל השדות");
            return;
        }
        this.resetFields();
        //firestore??
        this.props.navigation.navigate('Map');
    }

    resetFields(){
        this.setState({
            place: "",
            description: "",
            selectedLabel: "1"
        })
    }


    render(){
        return(
            <ImageBackground source={require ('../Images/BackGround.jpg')} imageStyle={{opacity:0.15}} style={{flex: 1,height:"100%"}}>
                <View>
                    <Header 
                        backgroundColor="#e6ffe6"
                        rightComponent = {this.backButton()}
                        centerComponent = {{text: 'עריכת מקום' ,style: styles.centerComponentStyle }}
                                         
                    > 
                    </Header>
                </View>              

                <View style={{marginTop:60,marginBottom:20,height:'10%'}}>
                    <TextInput style={styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"שם מקום"}
                        placeholderTextColor = "#006400"                        
                        autoCorrect = {false}
                        onChangeText = {place => this.setState({place})}
                        value = {this.state.place}
                    />
                </View>
                <View style={styles.pickerStyle}>
                    <Picker style={{color: "#006400" , left:62 , top: '9%'}} 
                        selectedValue={this.state.selectedLabel}
                        onValueChange = {this.Show.bind()}>
                        <Picker.Item label="בחר קטגוריה" value="1" ></Picker.Item>
                        <Picker.Item label="אתר פריחה" value="2"></Picker.Item>
                        <Picker.Item label="אתר צפרות וצפיית חיות בר" value="3"></Picker.Item>
                        <Picker.Item label="גינה ציבורית" value="4"></Picker.Item>
                        <Picker.Item label="גינה קהילתית" value="5"></Picker.Item>
                        <Picker.Item label="חנות אופניים" value="6"></Picker.Item>
                        <Picker.Item label="חנות טבע" value="7"></Picker.Item>
                        <Picker.Item label="חנות יד שניה" value="8"></Picker.Item>
                        <Picker.Item label="ספריית רחוב" value="9"></Picker.Item>
                        <Picker.Item label="עץ פרי" value="10"></Picker.Item>
                        <Picker.Item label="פח מיחזור" value="11"></Picker.Item>
                        <Picker.Item label="צמח מאכל ומרפא" value="12"></Picker.Item>
                        <Picker.Item label="קומפוסטר" value="13"></Picker.Item>  
                    </Picker>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"תיאור"}
                        maxHeight={145}
                        autoGrow={true}                    
                        placeholderTextColor = "#006400"
                        autoCorrect = {false}
                        onChangeText = {description => this.setState({description})}
                        value = {this.state.description}
                        multiline={true}
                        numberOfLines={5}
                    />
                </View>

                <View>{this.updateButton()}</View>

            </ImageBackground>
        )
    }
}

export default AddLocationForm;

const styles = {
    inputView: {
        paddingTop: "12%",
        paddingBottom: "8%",
        
    },
    textInputStyle: {
        borderColor: "#006400",
        borderRadius: 15,
        borderWidth: 3,
        fontSize: 20,
        width: "80%",
        alignSelf: "center"
    },
    buttonStyle: {
        height : 45,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#006400',
        borderColor: "#004577",
        borderWidth:3,
        borderRadius: 10, 
    },
    backButtonStyle: {
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
    pickerStyle: {
        borderColor: "#006400",
        borderRadius: 15,
        borderWidth: 3,
        width: "80%",
        alignSelf: "center",
        color: "#006400",
        borderColor: "#006400",
        height : "10%",
        top:"2%",
    },
    buttonTextStyle:{
        fontSize : 25,
        color : "white",
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
    }
}