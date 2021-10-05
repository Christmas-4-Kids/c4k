import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useUser } from "../context/StateContext";

const Home = (props) => {
  const [user, setUser] = useUser();
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        {user.type === "Chaperone" && (
          <View style={styles.sectionContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate("UserInfoPage")}
            >
              <Text style={styles.buttonText}> Update Info </Text>
            </TouchableOpacity>
          </View>
        )}
        {user.type === "Organizer" && (
          <View style={{ flexGrow: 1 }}>
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  props.navigation.navigate("DriversLicenseScanPage")
                }
              >
                <Text style={styles.buttonText}>Verify Driver's License</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("MembersPage")}
              >
                <Text style={styles.buttonText}>View Chaperones</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => props.navigation.navigate("DriversPage")}
              >
                <Text style={styles.buttonText}>View Drivers</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("RulesPage")}
          >
            <Text style={styles.buttonText}> Read Rules </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("SchedulePage")}
          >
            <Text style={styles.buttonText}> Schedule </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
