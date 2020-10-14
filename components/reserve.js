import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal,Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
//import for animations.
import * as Animatable from 'react-native-animatable';
// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component{
    constructor(props){
        super(props);
        this.state={
            guests: 1,
            smoking: false,
            mada: false,
            date: '',
            showModal : false,
            calendarId:''
        }
    }
    toggleModal(){
        console.log(this.state)
        this.setState({showModal: !this.state.showModal});
        console.log(this.state)
    }
    resetForm(){
        this.setState({
            guests: 1,
            smoking: false,
            mada:false,
            date: ''
        });
    }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        console.log("Inside Local");
        await this.obtainNotificationPermission();
        console.log("Permission granted");
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    getDefaultCalendarSource = async () => {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
      }

    createCalendar = async (date) => {
        const calanderPermission = await Permissions.askAsync(Permissions.CALENDAR);
        // const reminderPermission = await Permissions.askAsync(Permissions.REMINDERS);
        if(calanderPermission.status == 'granted')
        {
            const defaultCalendarSource = Platform.OS === 'ios'
            ? await this.getDefaultCalendarSource()
            : { isLocalAccount: true, name: 'Expo Calendar' };
            console.log(date);
                const newCalendarID = await Calendar.createCalendarAsync({
                    title: 'Reservation',
                    color: 'blue',
                    entityType: Calendar.EntityTypes.EVENT,
                    sourceId: defaultCalendarSource.id,
                    source: defaultCalendarSource,
                    name: 'internalCalendarName',
                    ownerAccount: 'personal',
                    accessLevel: Calendar.CalendarAccessLevel.OWNER,
                  });
                  var date = new Date(date);
                const event = Calendar.createEventAsync(newCalendarID,{
                    title:"Reserv",
                    startDate: date,
                    endDate:date
                })
            this.setState({calendarId:newCalendarID});
            console.log(date);
        }
    }




    handleReservation({guests,smoking,date}){
    console.log(JSON.stringify(this.state));
    Alert.alert(
        "Your Reservations ok ?",
        "Number of Guests: " + this.state.guests+"\nSmoking ? "+ this.state.smoking+"\ndate: "+this.state.date,
        [
            {
                text: "cancel",
                onPress: () => {this.resetForm()}
            },
            {
                text: "ok",
                onPress: () => {
                    this.presentLocalNotification(this.state.date);
                    this.createCalendar(this.state.date);
                    this.resetForm()}
            }

        ]
    )


    }
    render(){
        return(
            <Animatable.View animation="zoomIn" duration={1000}>
                <ScrollView>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Ganjei maribu ?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Mada haba ta ?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.mada}
                    onTintColor='red'
                    onValueChange={(value) => this.setState({mada: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2017-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    // ... You can check the source to find the other keys. 
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation(this.state)}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Modal animationType={"fade"}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={()=> {this.toggleModal(); this.resetForm();}}
                onRequestClose={()=> {this.toggleModal(); this.resetForm();}}
                >
                    <View style={styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                            <Text style = {styles.modalText}>Ganjei ?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style = {styles.modalText}>Mada : {this.state.mada ? "aji gadibu" : "tu sure mada peebuni ?"}</Text>
                            <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                            <Button onPress = {()=> {this.toggleModal(); this.resetForm();}}
                            color="red" title="close"
                            />
                    </View>
                </Modal>
            </ScrollView>
        </Animatable.View>
        );
    }
}
const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        backgroundColor: 'black',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: 'black',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10,
         color:"white"
     }
});

export default Reservation;