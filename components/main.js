import React , {Component} from 'react';
//component imports
import Menu from './menu';
import Home from './home';
import About from './about';
import Contact from './contact';
import {DISHES} from '../shared/dishes';
import DishDetail from './dishDetail';
import {Text,View,Platform, Image, StyleSheet, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
//navigation components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const MenuNav = () => {
  return(
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={Menu}/>
      <Stack.Screen name="DishDetail" component={DishDetail}/>
    </Stack.Navigator>
  );
}
/*
const MenuNav = createStackNavigator({
    Menu:{screen:Menu,
    navigationOptions:({navigation}) =>({
      //menu icon that toggles drawer.
      headerLeft:<Icon name="menu" size={24} color="white" onPress={()=> navigation.toggleDrawer()} />
    })
    },
    DishDetail:{screen:DishDetail}
},{
    initialRouteName:'Menu',
    navigationOptions:{
        headerStyle:{
            backgroundColor: '#000'
        },
        headerTintColor: '#fff',
        headerTintStyle: {
            color: '#fff'
        },
      //menu icon that toggles drawer.
      headerLeft:<Icon name="menu" size={24} color="white" onPress={()=> navigation.toggleDrawer()} />
    }
});
*/
const HomeStack = createStackNavigator();
const HomeNav = () => {
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home}/>
    </HomeStack.Navigator>
  );
}
/*
const HomeNav = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#000"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",  
      //menu icon that toggles drawer.
      headerLeft:<Icon name="menu" size={24} color="white" onPress={()=> navigation.toggleDrawer()} />      
    }
    )
});
*/
const AboutStack = createStackNavigator();
const AboutNav = () => {
  return(
    <AboutStack.Navigator>
      <AboutStack.Screen name="About" component={About}/>
    </AboutStack.Navigator>
  );
}
/*
const AboutNav = createStackNavigator({
  About:{screen: About}
},
{
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTitleStyle: {
      color: '#fff'
    },
    headerTintColor: "#fff",
      //menu icon that toggles drawer.
      headerLeft:<Icon name="menu" size={24} color="white" onPress={()=> navigation.toggleDrawer()} />    
  })
});
*/

const ContactStack = createStackNavigator();
const ContactNav = () => {
  return(
    <ContactStack.Navigator>
      <ContactStack.Screen name="Contact" component={Contact}/>
    </ContactStack.Navigator>
  );
}
/*
const ContactNav = createStackNavigator({
  Contact:{screen:Contact}
},
{
  navigationOptions: ({navigation}) => ({
    headerStyle: {
      backgroundColor: '#000'
    },
    headerTitleStyle: {
      color: '#fff'
    },
    headerTintColor: "#fff",
      //menu icon that toggles drawer.
      headerLeft:<Icon name="menu" size={24} color="white" onPress={()=> navigation.toggleDrawer()} />
  })
});
*/
/*
//custom header for drawer.
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Butter Chicken.</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
*/

const Draw = createDrawerNavigator();
const DrawNav = () => {
  return(
    <Draw.Navigator initialRouteName="Home">
      <Draw.Screen name="Home" component={HomeNav}/>
      <Draw.Screen name="About" component={AboutNav}/>
      <Draw.Screen name="Menu" component={MenuNav}/>
      <Draw.Screen name="Contact" component={ContactNav}/>
    </Draw.Navigator>
  );
}

/*
const MainNav = createDrawerNavigator({
    Home: 
      { screen: HomeNav,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='home'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          )
        }
      },
    About:  
      {
        screen:AboutNav,
        navigationOptions: {
          title: 'About',
          drawerLabel: 'About',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='info'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }
      },
    Menu: 
      { screen: MenuNav,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='list'
              type='font-awesome'            
              size={24}
              color={tintColor}
            />
          ),
        }, 
      },
      Contact:
      {
        screen: ContactNav,
        navigationOptions: {
          title: 'Contact us',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name='address-card'
              type='font-awesome'            
              size={22}
              color={tintColor}
            />
          )
        }
      }
}, {
    drawerBackgroundColor:'#000',
    contentComponent: CustomDrawerContentComponent,
    contentOptions: {
    activeTintColor :'#1999CE',
     inactiveTintColor :'#fff',

    inactiveBackgroundColor :'#000',
  }
});
*/
class Main extends Component{
     constructor(props){
         super(props);
         this.state={
             dishes:DISHES,
             selectedDish:null
         };
     }
    onDishSelect = (dishId) => {
        this.setState({selectedDish : dishId})
        console.log(this.state);
     }
     render(){
         return(
            <View style={{flex:1}}>  
            <NavigationContainer>
              <DrawNav/>
            </NavigationContainer>
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

export default Main;