import React, { Component } from "react";
import { View , TextInput , Text , ImageBackground , Picker, TouchableOpacity,Alert } from "react-native";
import { Header } from "react-native-elements"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DropdownAlert from 'react-native-dropdownalert'
import firebase from '../config/Firebase'
import 'react-navigation'


class AddLocationForm extends Component{
    constructor(props){
        super(props);
        this.placesRef = firebase.database().ref().child('Places');
        this.pickersRef = firebase.database().ref().child('Categories');
        this.state = {
            place: "",
            description: "",
            selectedLabel: "1",
            pickers: []
        }
    }

    componentDidMount(){
        if(this.props.navigation.state.params.isNew==false){
            this.setState({
                place: this.props.navigation.state.params.place.val().name,
                description: this.props.navigation.state.params.place.val().description,
                selectedLabel: this.props.navigation.state.params.place.val().category
            })
        }

        this.pickersRef.on('child_added', () => this.getPickers())
        this.pickersRef.on('child_changed', () => this.getPickers())
        this.pickersRef.on('child_removed', () => this.getPickers())
        
    }

    getPickers() {
        var pickers_list = [];
        pickers_list.push(<Picker.Item label="בחר קטגוריה" value="בחר קטגוריה"></Picker.Item>)
        this.pickersRef.orderByValue().on('value', (categories) => {
            categories.forEach((category) => {
                pickers_list.push(
                    <Picker.Item label={category.val()} value={category.val()} ></Picker.Item>
                )
            })
        })
        pickers_list.push(<Picker.Item label="אחר" value="אחר"></Picker.Item>)
        this.setState({ pickers: pickers_list })
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
        this.props.navigation.navigate('Map');
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
        if(this.state.place === "" ){
            this.dropDownAlertRef.alertWithType('warn','', "אנא הכנס שם מקום");
            return;
        }

        if(this.state.selectedLabel === "1"){
            this.dropDownAlertRef.alertWithType('warn', '',"אנא בחר קטגוריה");
            return;
        }
       
        if(this.props.navigation.state.params.isNew==true){
            this.placesRef.push({
            latitude: this.props.navigation.state.params.latitude,
            longitude: this.props.navigation.state.params.longitude,
            name: this.state.place,
            description:this.state.description,
            category:this.state.selectedLabel

            })
        }
        else{
 
            var place = this.props.navigation.state.params.place;
            this.placesRef.child(""+place.key).set({                //Adding place to DB.
                latitude: place.val().latitude,
                longitude: place.val().longitude,
                name: this.state.place,
                description:this.state.description,
                category:this.state.selectedLabel
    
            })
            
        }
        this.resetFields();
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

                <KeyboardAwareScrollView enableOnAndroid = "true" >
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
                            {this.state.pickers} 
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
                </KeyboardAwareScrollView>

            <View style={{ position: "absolute", top: "0%", right: "25%", width: "50%", height: "40%"}}>
                <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
            </View>
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