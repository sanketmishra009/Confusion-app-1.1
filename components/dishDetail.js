import React,{Component} from 'react';
import {View, Text , FlatList, ScrollView, StyleSheet, Modal , Button, Alert, PanResponder, Share} from 'react-native';
import {Card, Icon, Input, Rating} from 'react-native-elements';
//import { DISHES } from '../shared/dishes';
//import { COMMENTS } from '../shared/comments';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites : state.favorites
    }
  }
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (comment) => dispatch(postComment(comment))
})

const RenderDish=(props)=>{
    
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -50 )
            return true;
        else
            return false;
    }
    const recognizeComment = ({ moveX, moveY, dx, dy }) => {
        if ( dx < +50 )
            return true;
        else
            return false;
    }

    handleViewRef = ref => this.View=ref;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.View.rubberBand(1000)
                .then(endState=> console.log(endState ? "Finished.":"Canceled."))
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState))
            {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
                }
            if(recognizeComment(gestureState))
            {
                props.writeComment();
            }

            return true;
        }
    })


    const shareDish=(title,message,url)=>{
        Share.share({
            title:title,
            message:title+": " +message+" \n"+url,
            url:url
        },{
            dialogTitle:"Share "+title
        })
    }
    const dish = props.dish;
    if (dish!=null){
        return(
            <Animatable.View animation="fadeInDown" duration={1000} delay={1000}  {...panResponder.panHandlers}
            ref= {this.handleViewRef}
            >
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
                    <Icon style={styles.iconEl}
                    raised reverse
                    name={"share"}
                    type="font-awesome"
                    color="lightblue"
                    onPress={()=> shareDish(dish.name,dish.description,baseUrl + dish.image)}
                    />
                    </View>
                </Card>
            </Animatable.View>
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
        <Animatable.View animation="fadeInUp" duration={1000} delay={1000}>
            <Card title="Comments">
            <FlatList
            data={comments}
            renderItem={renderCommentsItem}
            keyExtractor={item => item.id.toString()}/>
            </Card>
            
        </Animatable.View>
    );
}

class DishDetail extends Component{
    
    constructor(props){
        super(props);
        this.state={
            showModal:false,
            comment:"",
            author:"",
            rating:"",
            dishId:''
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
        var newcomment ={
            dishId: this.state.dishId,
            rating:this.state.rating,
            author:this.state.author,
            comment:this.state.comment
        }
        newcomment.id = Object.keys(this.props.comments.comments).length;
        newcomment.date = new Date().toISOString();
        this.props.postComment(newcomment);
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
        //this.setState({dishId:dishId});
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
            onDismiss={()=>{this.toggleModal(); this.resetForm()}}
            onRequestClose={()=>{this.toggleModal(); this.resetForm()}}
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
                    onChangeText={(value)=> this.setState({dishId:dishId ,comment:value})}
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