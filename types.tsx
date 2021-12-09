/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
  SignIn: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  Account: undefined
  Chaperones: undefined
  Home: undefined
  Modal: undefined
  Rules: undefined
  ScanDriversLicense: undefined
  Schedule: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type SearchFilters = {
  lebanon: boolean
  evening: boolean
  allDay: boolean
  admin: boolean
  driver: boolean
  checkedIn: boolean
  notCheckedIn: boolean
  espanol: boolean
  medical: boolean
}
