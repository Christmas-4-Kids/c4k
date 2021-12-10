/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { useUser } from "../context/user.context"
import { SignIn } from "../screens/SignIn"
import ModalScreen from "../screens/ModalScreen"
import NotFoundScreen from "../screens/NotFoundScreen"
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types"
import LinkingConfiguration from "./LinkingConfiguration"
import { Account } from "../screens/Account"
import { Home } from "../screens/Home"
import { Rules } from "../screens/Rules"
import { ChaperoneList } from "../screens/ChaperoneList"
import { Pressable } from "react-native"
import { ScanDriversLicense } from "../screens/ScanDriversLicense"
import { Schedule } from "../screens/Schedule"
import { Shopping } from "../screens/Shopping"

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
    primary: "#EF364B",
    card: "#EF364B",
  },
}

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={MyTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const { userIsSignedIn, userIsSigningOut } = useUser()
  return (
    <Stack.Navigator>
      {userIsSignedIn ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
          <Stack.Group screenOptions={{ presentation: "fullScreenModal" }}>
            <Stack.Screen
              name="Modal"
              component={ScanDriversLicense}
              options={({ navigation }: RootTabScreenProps<"Modal">) => ({
                title: "Scan Driver's License",
                headerShown: true,
                headerRight: () => (
                  <Pressable
                    onPress={() => navigation.goBack()}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.5 : 1,
                    })}
                  >
                    <FontAwesome name="window-close" size={25} color={"#1B2C39"} style={{ marginRight: 15 }} />
                  </Pressable>
                ),
              })}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: "Sign in",
            headerShown: false,
            // When logging out, a pop animation feels intuitive
            // You can remove this if you want the default 'push' animation
            animationTypeForReplace: userIsSigningOut ? "pop" : "push",
          }}
        />
      )}
    </Stack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
  const { user } = useUser()
  const isAdmin = user.volunteerType.endsWith("ADMIN")
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#ffe5e5",
        tabBarActiveBackgroundColor: "#EF364B",
        tabBarInactiveBackgroundColor: "#EF364B",
        headerTintColor: "#112430",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      {isAdmin ? (
        <BottomTab.Screen
          name="Chaperones"
          component={ChaperoneList}
          options={{
            title: "Volunteers",
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
          }}
        />
      ) : null}
      <BottomTab.Screen
        name="Rules"
        component={Rules}
        options={{
          title: "Rules",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="clipboard-check" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          title: "Schedule",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar-check" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Shopping"
        component={Shopping}
        options={{
          title: "Shopping",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user-alt" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome5>["name"]; color: string }) {
  return <FontAwesome5 size={25} style={{ marginBottom: -3 }} {...props} />
}
