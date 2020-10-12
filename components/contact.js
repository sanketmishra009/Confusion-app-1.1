import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component{
    sendMail(){
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render(){
        const title ="Contact Information";
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                title={title}>
                    <Text>
                    Our Address

    121, Clear Water Bay Road
    Clear Water Bay, Kowloon
    HONG KONG
    Tel: +852 1234 5678
    Fax: +852 8765 4321
    Email:confusion@food.net
                    </Text>
                    <Button 
                    title="send email"
                    buttonStyle={{backgroundColor:'#512DA8'}}
                    icon={<Icon name="envelope-o" type="font-awesome" color="white" iconStyle={{margin:2}}/>}
                    onPress={this.sendMail}
                    />
                </Card>
            </Animatable.View>
        );
    }
}

export default Contact;