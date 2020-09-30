import React,{Component} from 'react';
import {View, Text , FlatList, ScrollView, StyleSheet, Modal , Button} from 'react-native';
import {Card, Icon, Input, Rating} from 'react-native-elements';
//import { DISHES } from '../shared/dishes';
//import { COMMENTS } from '../shared/comments';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites : state.favorites
    }
  }
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

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
                    <View style={styles.iconrow}>
                    <Icon style={styles.iconEl}
                    raised reverse
                    name={props.favorites? "heart":"heart-o"}
                    type="font-awesome"
                    color="red"
                    onPress={()=> props.favorites ? console.log("Already Favorite"): props.onPress()}/>
                    <Icon style={styles.iconEl}
                    raised reverse
                    name={"pencil"}
                    type="font-awesome"
                    color="blue"
                    onPress={()=> props.writeComment()}
                    />
                    </View>
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
                <Rating imageSize={20}
                style={{alignItems:"left"}}
                readonly
                startingValue={item.rating} 
                count={5}/>
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
    
    constructor(props){
        super(props);
        this.state={
            showModal:false,
            comment:"",
            author:"",
            rating:""
        }
    }

    toggleModal(){
        //console.log(this.state)
        this.setState({showModal: !this.state.showModal});
        this.resetForm();
        console.log(this.state)
    }
    markFavoriteDish = (dishId) =>{
        this.props.postFavorite(dishId);
    }
    writeComment(){
        this.toggleModal();
    }
    submitForm(){
        //resets the modal form
        console.log("reset")
    }
    resetForm(){
        this.setState({
            comment:"",
            author:"",
            rating:""})
    }
    render(){
        //const {params} = this.props.navigation.state;
        const {dishId} = this.props.route.params;
        return(
        <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]} 
            favorites={this.props.favorites.some(el=>el===dishId)}
            onPress={()=> this.markFavoriteDish(dishId)} 
        writeComment={()=> this.writeComment()}/>
            <RenderComments comments={this.props.comments.comments.filter((comment)=> comment.dishId === dishId)} />
            <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showModal}
            onDismiss={()=>{this.toggleModal(); this.submitForm()}}
            onRequestClose={()=>{this.toggleModal(); this.submitForm()}}
            >
                 <View style={styles.modal}>
                    <Text style = {styles.modalTitle}>Write Comment</Text>
                    <Text>Bhala Rating te de:</Text>
                    <Rating imageSize={25}
                    startingValue={0}
                    count={5}
                    ratingBackgroundColor="#000"
                    onFinishRating={(value)=>this.setState({rating:value})}/>
                    <Input 
                    placeholder = "comments"
                    leftIcon={{type:'font-awesome', name:"comment"}}
                    onChangeText={(value)=> this.setState({comment:value})}
                    />
                    <Input 
                    placeholder = "author"
                    leftIcon={{type:'font-awesome', name:"user"}}
                    onChangeText={(value)=> this.setState({author:value})}
                    />
                    <Button onPress = {()=> {this.toggleModal(); this.submitForm();}}
                        color="red" title="submit"
                        />
                    <Button onPress = {()=> {this.toggleModal();}}
                        color="red" title="cancel"
                        />
                </View>
            </Modal>

        </ScrollView>
            );
            }
}
const styles = StyleSheet.create({
    iconrow:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
    iconEl:{
        flex:1
    },
    modal: {
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 20,
        paddingTop:100
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
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);