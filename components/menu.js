import React,{Component} from 'react';
import { View, FlatList , Text} from 'react-native';
import { ListItem , Avatar, Tile} from 'react-native-elements';
import {Loading} from './loading'; 
import * as Animatable from 'react-native-animatable';


//Redux import and function
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }


class Menu extends Component {
/*
    constructor(props){
        super(props);
        this.state={
            dishes:DISHES
        };
    }
*/
    static navigationOptions={
        title:'Menu'
    };
    render(){
        const renderMenuItem = ({item, index}) => {

            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                    <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => this.props.navigation.navigate('DishDetail', { dishId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image}}
                    />
                </Animatable.View>
            );
        };
    
            if (this.props.dishes.isLoading) {
                return(
                    <Loading />
                );
            }
            else if (this.props.dishes.errMess) {
                return(
                    <View>            
                        <Text>{this.props.dishes.errMess}</Text>
                    </View>            
                );
            }
            else {
                return (
                    <FlatList 
                        data={this.props.dishes.dishes}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                        />
                );
            }
    }
}


export default connect(mapStateToProps)(Menu);