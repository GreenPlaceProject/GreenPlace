import React, { Component } from "react"
import { TextInput, Button, Alert, Text,TouchableOpacity} from "react-native"
import { View } from "native-base"
import { Header} from "react-native-elements"

class Registeration extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            email: ""
        }
    }

    render(){
        return(
            <View>
                <Header 
                    centerComponent = {{text: 'הרשמה' ,style: styles.centerComponentStyle }}
                    backgroundColor="#82b74b"
                    rightComponent = { <TouchableOpacity
                                            title = "signIn"
                                            style={styles.returnButton}
                                        >
                                        <Text style = {styles.returnButtonText}>חזור</Text>
                                    </TouchableOpacity>
                    
                    
                   }
                />
                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"שם משתמש"}
                        placeholderTextColor = "#82b74b"
                        autoCorrect = {false}
                        onChangeText = {username => this.setState({ username })}
                        value = {this.state.username}
                    />
                </View>
                
                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"סיסמא"}
                        placeholderTextColor = "#82b74b"
                        secureTextEntry = {true}
                        autoCorrect = {false}
                        onChangeText = {password => this.setState({ password })}
                        value = {this.state.password}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"אימות סיסמא"}
                        placeholderTextColor = "#82b74b"
                        secureTextEntry = {true}
                        autoCorrect = {false}
                        //onChangeText = {password => this.setState({ password })}
                        value = {this.state.password}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style = {styles.textInputStyle}
                        textAlign = "center"
                        placeholder = {"אימייל"}
                        placeholderTextColor = "#82b74b"
                        autoCorrect = {false}
                        onChangeText = {email => this.setState({ email })}
                        value = {this.state.email}
                    />
                </View>

                <View style = {styles.buttonViewStyle}>
                    <TouchableOpacity
                        title = "signIn"
                        style={styles.buttonStyle}
                    >
                    <Text style = {styles.buttonTextStyle}>הרשם</Text>
                    </TouchableOpacity>
                </View>







            </View>
        )
    }


}

export default Registeration;


const styles = {
    inputView: {
        alignSelf : "center",
        paddingTop: "6%",
        height : "15%",
        width : "90%"
    },
    textInputStyle: {
        //height : 30,
        borderColor: "#006400",
        borderRadius: 25,
        borderWidth: 3,
        fontSize: 20,
        width: "80%",
        alignSelf: "center"
    },
    centerComponentStyle:{
        color: "#fff",
        fontWeight: "bold",
        fontSize:30
    },

    buttonViewStyle: {
        paddingTop: "15%",
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
        fontSize : 25,
        color : "white",
    },

    returnButton:{
        height : 50,
        width:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#006400',
        borderColor: "#004577",
        borderWidth:3,
        borderRadius: 25,
        top: -10
    },
    returnButtonText:{
        fontSize : 20,
        color : "white",
    }
}