import React, { Component } from "react";
import { View , TextInput , Text , ImageBackground , Picker, TouchableOpacity,Alert} from "react-native";
import { Header} from "react-native-elements"




class AddLocationForm extends Component{
    constructor(){
        super();
        this.state = {
            place: "",
            description: "",
            selectedLabel: ""
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
        Alert.alert("לא לשכוח למחוק שדות")
    }

    updateButton(){
        return (
            <View style = {{paddingTop: "6%"}}>
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
        Alert.alert("לא לשכוח למחוק שדות")
    }

    render(){
        return(
            <ImageBackground source={{uri: 'https://as1.ftcdn.net/jpg/00/56/36/10/500_F_56361031_5EREx9ZYgszatFr3NQTSQRMNI48LSh4N.jpg'}} imageStyle={{opacity:0.15}} style={{flex: 1,height:"100%"}}>
                <View>
                    <Header 
                        backgroundColor="#e6ffe6"
                        leftComponent = {this.backButton()}
                        centerComponent = {{text: 'עריכת מקום' ,style: styles.centerComponentStyle }}
                                         
                    > 
                    </Header>
                    
                </View>              

             
                <View style={{marginTop:60,marginBottom:20}}>
                    <TextInput style={styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"שם מקום"}
                        placeholderTextColor = "#006400"
                        height = {45}
                        autoCorrect = {false}
                        onChangeText = {place => this.setState({place})}
                        value = {this.state.place}
                    />
                </View>

                <View style={styles.pickerStyle}>
                    <Picker style={{color: "#006400" , left:-52 , top: -4}} 
    
                        selectedValue={this.state.selectedLabel}
                        onValueChange = {this.Show.bind()}
                    >
                        <Picker.Item label="בחר קטגוריה" value="1" ></Picker.Item>
                        <Picker.Item label="עץ פרי" value="2"></Picker.Item>
                        <Picker.Item label="צמח מאכל ומרפא" value="3"></Picker.Item>
                        <Picker.Item label="גינה ציבורית" value="4"></Picker.Item>
                        <Picker.Item label="חנות יד שניה" value="5"></Picker.Item>
                        <Picker.Item label="גינה קהילתית" value="6"></Picker.Item>
                        <Picker.Item label="אתר פריחה" value="7"></Picker.Item>
                        <Picker.Item label="ספריית רחוב" value="8"></Picker.Item>
                        <Picker.Item label="חנות טבע" value="9"></Picker.Item>
                        <Picker.Item label="קומפוסטר" value="10"></Picker.Item>
                        <Picker.Item label="פח מיחזור" value="11"></Picker.Item>
                        <Picker.Item label="אתר צפרות וצפיית חיות בר" value="12"></Picker.Item>
                        <Picker.Item label="חנות אופניים" value="13"></Picker.Item>
                    </Picker>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"תיאור"}
                        placeholderTextColor = "#006400"
                        height = {45}
                        autoCorrect = {false}
                        onChangeText = {description => this.setState({description})}
                        value = {this.state.description}
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
        backgroundColor:'#006400',
        borderColor: "#00ad5f",
        color: "#fff",
        borderRadius: 20,
        borderWidth: 1,
        fontSize: 20,
        width: "40%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 45, 
        bottom:-60
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
        height : "8%",
        top:"2%"
        
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
}