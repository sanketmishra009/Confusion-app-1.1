import React,{Component} from 'react';
import {View, Text , FlatList, ScrollView} from 'react-native';
import {Card, Icon} from 'react-native-elements';
//import { DISHES } from '../shared/dishes';
//import { COMMENTS } from '../shared/comments';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments
    }
  }

const RenderDish=(props)=>{
    const dish = props.dish;
    if (dish!=null){
        return(
            <Card
                featuredTitle = {dish.name}
                image={{uri:baseUrl+dish.image}}>
                    <Text style={{margin:10}}>
                        {dish.description}
                    </Text>
                    <Icon
                    raised reverse
                    name={props.favorites? "heart":"heart-o"}
                    type="font-awesome"
                    color="red"
                    onPress={()=> props.favorites ? console.log("Already Favorite"): props.onPress()}/>
            </Card>
        );
    }
    else{
        return(<View>
            <Text>
                Hi
            </Text>
        </View>);
    }
}

const RenderComments= (props) => {
    const comments = props.comments;
    const renderCommentsItem = ({item,index}) =>{
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    } 
    return(
        <Card title="Comments">
            <FlatList
            data={comments}
            renderItem={renderCommentsItem}
            keyExtractor={item => item.id.toString()}/>
        </Card>
    );
}

class DishDetail extends Component{
/*    
    constructor(props){
        super(props);
        this.state={
            dishes:DISHES,
            comments:COMMENTS,
            favorites:[]  
        };
    }
*/
    markFavoriteDish = (dishId) =>{
        this.setState({favorites:this.state.favorites.concat(dishId)})
    }
    render(){
        //const {params} = this.props.navigation.state;
        const {dishId} = this.props.route.params;
        return(
        <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]} 
            favorites={this.state.favorites.some(el=>el===dishId)}
            onPress={()=> this.markFavoriteDish(dishId)} />
            <RenderComments comments={this.props.comments.comments.filter((comment)=> comment.dishId === dishId)} />
        </ScrollView>
            );
            }
}

export default connect(mapStateToProps)(DishDetail);