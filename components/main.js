import React , {Component} from 'react';
//component imports
import Menu from './menu';
import Home from './home';
import About from './about';
import Login from './login';
import Contact from './contact';
import Reservation from './reserve';
import DishDetail from './dishDetail';
import Favorites from './favorites';
import { Text,View,Platform, Image, StyleSheet, ScrollView , StatusBar, ToastAndroid } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { Icon } from 'react-native-elements';
//navigation components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator , DrawerContentScrollView,DrawerItemList,DrawerItem} from '@react-navigation/drawer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//Redux components.
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
})

//Navigation setup.
const Stack = createStackNavigator();
const MenuNav = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName="Menu" screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="Menu" component={Menu} options={{
        headerLeft:(props)=><Icon name="menu" size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}/>
      <Stack.Screen name="DishDetail" component={DishDetail} options={{
        headerLeft:(props)=><Icon name="menu"  size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}/>
    </Stack.Navigator>
  );
}
//Favorite stack navigator
const FavStack = createStackNavigator();
const FavNav = ({navigation}) => {
  return(
    <FavStack.Navigator initialRouteName="Favorites" screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <FavStack.Screen name="Favorites" component={Favorites} options={{
        headerLeft:(props)=><Icon name="menu" size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}/>
      <FavStack.Screen name="DishDetail" component={DishDetail} options={{
        headerLeft:(props)=><Icon name="menu"  size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}/>
    </FavStack.Navigator>
  );
}
//Login Navigator.
const LoginStack = createStackNavigator();
const LoginNav = ({navigation}) => {
  return(
    <LoginStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <LoginStack.Screen name="Login" component={Login} options={{
        headerLeft:(props)=><Icon name="menu"  size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}
        />
    </LoginStack.Navigator>
  );
}
//Reserve table navigator.
const ReserveStack = createStackNavigator();
const ReserveNav = ({navigation}) => {
  return(
    <ReserveStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <ReserveStack.Screen name="Reserve" component={Reservation} options={{
        headerLeft:(props)=><Icon name="menu"  size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}
        />
    </ReserveStack.Navigator>
  );
}
const HomeStack = createStackNavigator();
const HomeNav = ({navigation}) => {
  return(
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fcc',
      headerTitleStyle: {
        fontWeight: 'bold',
        
      },
    }}>
      <HomeStack.Screen name="Home" component={Home} options={{
        marginTop:40,
        headerLeft:(props)=><Icon name="menu"  size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}
        />
    </HomeStack.Navigator>
  );
}
const AboutStack = createStackNavigator();
const AboutNav = ({navigation}) => {
  return(
    <AboutStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <AboutStack.Screen name="About" component={About} options={{
        headerLeft:(props)=><Icon name="menu" size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}/>
    </AboutStack.Navigator>
  );
}

const ContactStack = createStackNavigator();
const ContactNav = ({navigation}) => {
  return(
    <ContactStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <ContactStack.Screen name="Contact" component={Contact} options={{
        headerLeft:(props)=><Icon name="menu" size={30} color="white" onPress={()=> navigation.toggleDrawer()}/>
      }}/>
    </ContactStack.Navigator>
  );
}
/*
//custom header for drawer.
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Butter Chicken.</Text>
        </View>
      </View>
      <DrawerItem {...props} />
    </SafeAreaView>
  </DrawerContentScrollView>
);
*/

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Butter Chicken.</Text>
        </View>
      </View>
      </SafeAreaView>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
const Draw = createDrawerNavigator();
const DrawNav = () => {
  return(
    <Draw.Navigator initialRouteName="Home" 
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    drawerStyle={{
      backgroundColor: '#000'
    }} 
    drawerContentOptions={{
      activeTintColor: '#056',
      inactiveTintColor :'#fff'
    }}
    >
      <Draw.Screen name ="Login" component={LoginNav} options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='sign-in'
              type='font-awesome'            
              size={30}
              color="#fff"
            />
          )

      }}/>
      <Draw.Screen name="Home" component={HomeNav} options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={30}
              color="#fff"
            />
          )
        }}/>
      <Draw.Screen name="About" component={AboutNav} options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info'
              type='font-awesome'            
              size={30}
              color="#fff"
            />
          )
        }}/>
      <Draw.Screen name="Menu" component={MenuNav} 
      options={{
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='list'
            type='font-awesome'            
            size={30}
            color="#fff"
          />
        )
      }}/>
      <Draw.Screen name="Favorites" component={FavNav} 
      options={{
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='heart'
            type='font-awesome'            
            size={30}
            color="#fff"
          />
        )
      }}/>
      <Draw.Screen name="Contact" component={ContactNav} options={{
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={30}
              color="#fff"
            />
          )
        }}/>
      <Draw.Screen name="Reserve" component={ReserveNav} options={{
        drawerIcon: ({ tintColor, focused }) => (
          <Icon
            name='cutlery'
            type='font-awesome'            
            size={30}
            color="#fff"
          />
        )
      }}/>
    </Draw.Navigator>
  );
}

class Main extends Component{
/*
  constructor(props){
         super(props);
         this.state={
             dishes:DISHES,
             selectedDish:null
         };
     }
    */
     componentDidMount() {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
      console.log("components mounted.")
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      });
      // NetInfo.addEventListner(state=>{'connectionChange',this.handleConnectionChange});
      // Subscribe
      const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
      });

      // Unsubscribe
      unsubscribe();
    }
    // componentWillUnmount(){
    //   NetInfo.removeEventListner('connectionChange',this.handleConnectionChange);
    // }
    onDishSelect = (dishId) => {
        this.setState({selectedDish : dishId})
        // console.log(this.state);
     }
     handleConnectivityChange = (connectionInfo) => {
      switch (connectionInfo.type) {
        case 'none':
          ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
          break;
        case 'wifi':
          ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
          break;
        case 'cellular':
          ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
          break;
        case 'unknown':
          ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
          break;
        default:
          break;
      }
    }
     render(){
         return(
            <View style={{flex:1}}>  
            <SafeAreaProvider>
              <NavigationContainer>
              {/* <StatusBar  
     backgroundColor = "#fff"  
     barStyle = "dark-content"   
   />   */}
                <DrawNav/>
              </NavigationContainer>
            </SafeAreaProvider>
            </View>
         );
     }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);