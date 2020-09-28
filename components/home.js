import { Text, ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements';
//import { DISHES } from '../shared/dishes';
//import { PROMOTIONS } from '../shared/promotions';
//import { LEADERS } from '../shared/leaders';
import React,{Component} from 'react';
import {Loading} from './loading';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }



const RenderItem = (props)=>{
    const item = props.item;
    if(props.isLoading){
        return(<Loading/>);
    }
    else if(props.errMess){
        return(
            <Text>{props.errMess}</Text>
        );
    }
    else{
        if(item!=null){
            return(
                <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{uri: baseUrl + item.image}}
                >
                <Text style={{margin:10}}>
                    {item.description}
                </Text>
                </Card>
            );
        }
        else{
            return(
                <View></View>
            );
        }
    }
}

class Home extends Component{
/*
    constructor(props){
        super(props);
        this.state={
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }
*/
    static navigationOptions={
        title:'Home'
    };
    render(){
        return(
            <ScrollView>
                <Text>Hi.</Text>
                <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess} 
                    />
                <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess} 
                    />
                <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess} 
                    />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(Home);