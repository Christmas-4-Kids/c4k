import React from "react";
import { View } from "react-native";
import Landing from "./Landing";
import Authenticate from "./Authenticate";
import CheckIn from "./CheckIn";
import DriversLicenseScan from "./DriversLicenseScan";
import Rules from "./Rules";
import Home from "./Home";
import UserEdit from "./UserEdit";
import UserInfo from "./UserInfo";
import AllDayChaperones from "./AllDayChaperones";
import EveningChaperones from "./EveningChaperones";
import LebanonChaperones from "./LebanonChaperones";
import MembersHome from "./MembersHome";
import Drivers from "./Drivers";
import Schedule from "./Schedule";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const defaultHeaderOptions = {
  headerStyle: {
    backgroundColor: "#112430",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

const Main = () => {
  const BtmTab = createDrawerNavigator();
  function MainTabs() {
    return (
      <BtmTab.Navigator>
        <BtmTab.Screen name="Home" component={Home} />
        <BtmTab.Screen name="User" component={UserInfo} />
      </BtmTab.Navigator>
    );
  }
  /*
  const MainTabs = createBottomTabNavigator({
    Home: Home,
    User: UserInfo,
  });
  */
  const Drawer = createDrawerNavigator();

  function MainDrawer() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="MainTabs" component={MainTabs} />
      </Drawer.Navigator>
    );
  }
  /*
  const MainDrawer = createDrawerNavigator({
    MainTabs: MainTabs,
  });
  */
  const Stack = createStackNavigator();

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={Home} />
        <Stack.Screen name="CheckInPage" component={CheckIn} />
        <Stack.Screen
          name="DriversLicenseScanPage"
          component={DriversLicenseScan}
        />
        <Stack.Screen name="MembersPage" component={MembersHome} />
        <Stack.Screen
          name="AllDayChaperonesPage"
          component={AllDayChaperones}
        />
        <Stack.Screen
          name="EveningChaperonesPage"
          component={EveningChaperones}
        />
        <Stack.Screen
          name="LebanonChaperonesPage"
          component={LebanonChaperones}
        />
        <Stack.Screen name="DrivesPage" component={Drivers} />
        <Stack.Screen name="RulesPage" component={Rules} />
        <Stack.Screen name="SchedulePage" component={Schedule} />
        <Stack.Screen name="UserInfoPage" component={UserInfo} />
        <Stack.Screen name="UserEditPage" component={UserEdit} />
      </Stack.Navigator>
    );
  }
  /*
  const HomeStack = createStackNavigator(
    {
      HomePage: Home,
      CheckInPage: { screen: CheckIn },
      DriversLicenseScanPage: { screen: DriversLicenseScan },
      MembersPage: { screen: MembersHome },
      AllDayChaperonesPage: { screen: AllDayChaperones },
      EveningChaperonesPage: { screen: EveningChaperones },
      LebanonChaperonesPage: { screen: LebanonChaperones },
      DriversPage: { screen: Drivers },
      RulesPage: { screen: Rules },
      SchedulePage: { screen: Schedule },
      UserInfoPage: UserInfo,
      UserEditPage: { screen: UserEdit },
    },
    {
      initialRouteName: "HomePage",
      mode: "modal",
      defaultNavigationOptions: defaultHeaderOptions,
    }
  );
*/
  function UserStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="UserInfoPage" component={UserInfo} />
        <Stack.Screen name="UserEditPage" component={UserEdit} />
      </Stack.Navigator>
    );
  }
  /*
  const UserStack = createStackNavigator(
    {
      UserInfoPage: UserInfo,
      UserEditPage: { screen: UserEdit },
    },
    {
      initialRouteName: "UserInfoPage",
      mode: "modal",
      headerMode: "none",
    }
  );
  */
  function AuthStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="LandingPage" component={Landing} />
        <Stack.Screen name="AuthenticatePage" component={Authenticate} />
      </Stack.Navigator>
    );
  }
  /*
  const AuthStack = createStackNavigator(
    {
      LandingPage: {
        screen: Landing,
      },
      AuthenticatePage: {
        screen: Authenticate,
      },
    },
    {
      initialRouteName: "LandingPage",
      defaultNavigationOptions: defaultHeaderOptions,
    }
  );
  */

  function RootSwitch() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AuthScreen" component={AuthStack} />
          <Stack.Screen name="HomePage" component={HomeStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  const MainContainer = RootSwitch;

  return (
    <View style={{ flex: 1 }}>
      <MainContainer />
    </View>
  );
};

export default Main;
