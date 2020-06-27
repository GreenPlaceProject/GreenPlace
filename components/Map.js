import React, { Component } from "react"
import { Text, TouchableOpacity, Picker, Alert } from "react-native"
import { View, Button } from "native-base"
import { Header } from "react-native-elements"
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import firebase from '../config/Firebase'
import 'react-navigation'


class Map extends Component {
    constructor(props) {
        super(props);
        this.placesRef = firebase.database().ref().child('Places');
        this.pickersRef = firebase.database().ref().child('Categories');
        this.state = {
            pickerSelectedLabel: '1',
            latitude: '',
            longitude: '',
            myCoordinates: [],
            pickers: []
        };
    }

    componentDidMount() {
        if (this.props.navigation.state.params.intro === "first time") {
            this.props.navigation.state.params.intro = "";
            Alert.alert("לחץ על המפה כדי להוסיף מקום חדש");
        }
        this.pickersRef.on('child_added', () => this.getPickers())
        this.pickersRef.on('child_changed', () => this.getPickers())
        this.pickersRef.on('child_removed', () => this.getPickers())

        this.placesRef.on('child_added', () => this.getPlaces())
        this.placesRef.on('child_changed', () => this.getPlaces())
        this.placesRef.on('child_removed', () => this.getPlaces())

    }

    selectIcon(category) {
        if (category === "אתר פריחה")
            return (require('../Icons/floweringSite.png'))
        if (category === "אתר צפרות וצפיה בחיות בר")
            return (require('../Icons/birdingSite.png'))
        if (category === "גינה ציבורית")
            return (require('../Icons/publicGarden.png'))
        if (category === "גינה קהילתית")
            return (require('../Icons/communityGarden.png'))
        if (category === "חנות אופניים")
            return (require('../Icons/bicycleShop.png'))
        if (category === "חנות טבע")
            return (require('../Icons/natureShop.jpeg'))
        if (category === "חנות יד שניה")
            return (require('../Icons/secondHandShop.png'))
        if (category === "ספריית רחוב")
            return (require('../Icons/streetLibrary.png'))
        if (category === "עץ פרי")
            return (require('../Icons/fruitTree.png'))
        if (category === "פח מיחזור")
            return (require('../Icons/recyclingBins.png'))
        if(category==="צמח מאכל ומרפא")
            return (require('../Icons/medicinalPlants.png'))
        if(category==="קומפוסטר")
            return (require('../Icons/composter.png'))
        else return (require('../Icons/else.png'));
    }

    getPlaces() {
        var placesList = [];
        this.placesRef.on('value', places => {
            places.forEach((place) => {
                if (this.state.pickerSelectedLabel === "בחר קטגוריה" || place.val().category == this.state.pickerSelectedLabel) {
                    var icon=this.selectIcon(place.val().category);
                    placesList.push(
                        <Marker coordinate={{ latitude: place.val().latitude, longitude: place.val().longitude }}
                            onPress={() => this.showPlace(place)}
                            image={icon}
                        />
                    )
                }

            })
        })

        this.setState({ myCoordinates: placesList })
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



    clickOnMap(latitude, longitude) {
        Alert.alert('הוספת מקום', 'האם אתה רוצה להוסיף את המקום למפה?',
            [{ text: 'לא', onPress: () => { return } },
            { text: 'כן', onPress: () => this.yesPressed(latitude, longitude) }])
    }

    yesPressed(latitude, longitude) {
        if (this.props.navigation.state.params.user === "")
            Alert.alert("נא להרשם/להתחבר כדי להוסיף מקום למפה");
        else
            this.props.navigation.navigate('AddLocation', { isNew: true, latitude: latitude, longitude: longitude, creator: this.props.navigation.state.params.user  })
    }

    showPlace(place) {
        Alert.alert("" + place.val().name , "קטגוריה:"+place.val().category+"\n"+ place.val().description + "\nיוצר: " + place.val().creator,
            [
                { text: 'יציאה', onPress: () => { return } },
                { text: 'מחיקת מקום', onPress: () => this.deletePlace(place) },
                { text: 'עריכת מקום', onPress: () => this.updatePlace(place) }
            ])
    }


    updatePlace(place) {
        if (this.props.navigation.state.params.user === "")
            Alert.alert("נא להרשם/להתחבר כדי לערוך מקום במפה");
        else
            this.props.navigation.navigate('AddLocation', { isNew: false, place: place });
    }

    deletePlace(place) {
        if (this.props.navigation.state.params.user === "")
            Alert.alert("נא להרשם/להתחבר כדי למחוק מקום מהמפה");
        else {
            Alert.alert('האם אתה בטוח?', '',
                [
                    { text: 'לא', onPress: () => { return } },
                    { text: 'כן', onPress: () => this.placesRef.child(place.key).remove() }
                ])
        }
    }

    show = (value) => {
        this.setState({ pickerSelectedLabel: value });
        setTimeout(() => { this.getPlaces(); }, 1);
    }


    headerButton() {
        return (<TouchableOpacity
            title="signOut"
            style={styles.returnButton}
            onPress={() => this.buttonUser()}>
            <Text style={styles.returnButtonText}>{this.props.navigation.state.params.btn}</Text>
        </TouchableOpacity>)
    }

    buttonUser() {
        if (this.props.navigation.state.params.user === "")
            this.props.navigation.goBack();
        else
            firebase.auth().signOut()
                .then(() => {
                    this.props.navigation.navigate('Login')
                })
                .catch(() => Alert.alert("ההתנתקות נכשלה"));
    }

    render() {
        return (
            <View>
                <Header
                    backgroundColor="#e6ffe6"
                    rightComponent={() => this.headerButton()}
                >
                </Header>
                <View style={{ width: "70%", left: "1%" }}>
                    <Picker
                        selectedValue={this.state.pickerSelectedLabel}
                        onValueChange={this.show.bind()}
                        style={{ position: 'absolute', left: 0, bottom: 10, right: 5 }}>
                        {this.state.pickers}
                    </Picker>

                </View>
                <View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: 31.756106,
                            longitude: 35.165088,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.001
                        }}
                        onPress={(event) => {
                            this.clickOnMap(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude);
                        }}
                    >

                        {this.state.myCoordinates}

                    </MapView>
                </View>
            </View>
        )
    }
}

export default Map;

const styles = {
    buttonTextStyle: {
        fontSize: 20,
        color: "white",
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
        left: -10,
        top: -10
    },

    returnButtonText: {
        fontSize: 15,
        color: "white",
    },

    map: {
        height: '100%'
    },

}
