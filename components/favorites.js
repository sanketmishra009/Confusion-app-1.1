import React,{Component} from 'react';
import { View, FlatList , Text} from 'react-native';
import { ListItem , Avatar, Tile} from 'react-native-elements';
import {Loading} from './loading'; 
//Redux import and function
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import {deleteFavorite} from '../redux/ActionCreators';
import Swipeout from 'react-native-swipeout';

const mapStateToProps = state => {
    return {
        favorites: state.favorites,
        dishes: state.dishes
    }
  }
const mapDispatchToProps = dispatch => {
    return{
        deleteFavorite: (dishId)=> dispatch(deleteFavorite(dishId))
    }
}
class Favorites extends Component{
    render(){
        const renderMenuItem = ({item, index}) => {

            const rightButton = [
                {
                    text:"Delete",
                    type:"delete",
                    onPress: () => {this.props.deleteFavorite(item.id)}
                }
            ];
            return (
                <Swipeout
                right = {rightButton}
                autoClose={true}>
                    <ListItem key={index} bottomDivider 
                    onPress={() => this.props.navigation.navigate('DishDetail', { dishId: item.id })}
                    >
                    <Avatar source={{uri: baseUrl + item.image}} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                    </ListItem>
                </Swipeout>
            );
        };
        if(this.props.dishes.isLoading){
            return(<Loading/>);
        }
        else if (this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else{
            if (this.props.favorites.length == 0 ){
                return(
                <View>
                    <Text>No favorites.</Text>
                </View>
                );
            }
            else{
                return(
                    <FlatList
                    data={this.props.dishes.dishes.filter((dish)=> this.props.favorites.some(el=>el==dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
                );
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);