import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {Card} from 'react-native-elements';

class Contact extends Component{

    render(){
        const title ="Contact Information";
        return(
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
            </Card>
        );
    }
}

export default Contact;