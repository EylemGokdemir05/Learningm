import React from 'react';
import { StyleSheet, View } from 'react-native';
import {StatusBar} from "expo-status-bar";
import LandingPage from './LandingPage';
import LoginOptionPage from './LoginOptionPage';
import LoginPage from './LoginPage';
import UserHome from './UserHome';
import RegisterPage from './Registerpage';
import RegisterOptionPage from './RegisterOptionPage';
import LanguagePage from './LanguagePage';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {connect} from 'react-redux';
import ProfilePage from './ProfilePage';
import DrawerContent from './DrawerContent';
import OnBoardScreen from './OnBoardScreen';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackNavigation =() =>{
  return (
      <Stack.Navigator headerMode="none" mode="card" screenOptions="" >
                    <Stack.Screen
                      name="Onboardscreen"
                      component={OnBoardScreen}
                    />
                    <Stack.Screen
                      name="LandingPage"
                      component={LandingPage}
                    />
                    <Stack.Screen
                      name="RegisterOption"
                      component={RegisterOptionPage}
                    />
                    <Stack.Screen
                      name="LoginOptionPage"
                      component={LoginOptionPage}
                    />
                    <Stack.Screen
                      name="LoginPage"
                      component={LoginPage}
                      
                    />
                    <Stack.Screen
                      name="Language"
                      component={LanguagePage}
                    />
                    <Stack.Screen
                      name="RegisterPage"
                      component={RegisterPage}  
                    />
                    <Stack.Screen
                      name="Profile"
                      component={ProfilePage}
                    />
      </Stack.Navigator>
  )
}

const DrawerNavigation =() =>{
  return (
          <Drawer.Navigator drawerContent={props => <DrawerContent  {...props}/>}>
              <Drawer.Screen 
                name="UserHome"
                component={UserHome}
              />
          </Drawer.Navigator>
  )
}
function NavigationPage(props){
    let {userState} = props;

    React.useEffect(() =>{
        userState =props.userState;
    },[props.userState])
    return(
        <NavigationContainer>
            <View style={styles.container}>
                <StatusBar/>
                {/* <DrawerNavigation/> */}
                  {userState.isLanguageChosen ?(
                    <DrawerNavigation/>
                  ):
                  (
                    <StackNavigation/>
                  )} 
            </View>
        </NavigationContainer>
    )
}

const mapStateToProps =(state) =>{
    return {
        userState:state.user
    }
}
export default connect(mapStateToProps)(NavigationPage);
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });