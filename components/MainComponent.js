import React, {Component} from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {View, Platform} from 'react-native';
import {DISHES} from '../shared/dishes';
import {createDrawerNavigator, createStackNavigator} from "react-navigation";
import Home from "./HomeComponent";
import Contact from "./ContactComponent"
import AboutUS from "./AboutComponent"

const HomeNavigator = createStackNavigator({
    Home: {screen: Home}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
});

const AboutUsNavigator = createStackNavigator({
    Home: {screen: AboutUS}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
});

const MenuNavigator = createStackNavigator({
        Menu: {screen: Menu},
        DishDetail: {screen: DishDetail}
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

const ContactUsNavigator = createStackNavigator({
    Home: {screen: Contact}
}, {
    navigationOptions: ({navigation}) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff"
    })
});

const MainNavigator = createDrawerNavigator({
    Home:
        {
            screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home'
            }
        },
    AboutUs:
        {
            screen: AboutUsNavigator,
            navigationOptions: {
                title: 'About Us',
                drawerLabel: 'About Us'
            }
        },
    Menu:
        {
            screen: MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu'
            },
        },
    ContactUs:
        {
            screen: ContactUsNavigator,
            navigationOptions: {
                title: 'Contact Us',
                drawerLabel: 'Contact Us'
            }
        },
}, {
    drawerBackgroundColor: '#D1C4E9'
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    render() {

        return (
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator/>
            </View>
        );
    }
}

export default Main;
