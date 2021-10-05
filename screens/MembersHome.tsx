import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import { useUser } from "../context/StateContext";

const MembersHome = (props) => {
  const [user, setUser] = useUser();
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.scrollView}
        >
          {user.type === "Organizer" && (
            <View>
              <View style={styles.sectionContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    props.navigation.navigate("AllDayChaperonesPage")
                  }
                >
                  <Text style={styles.buttonText}>View All Day Chaperones</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    props.navigation.navigate("EveningChaperonesPage")
                  }
                >
                  <Text style={styles.buttonText}>View Evening Chaperones</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sectionContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    props.navigation.navigate("LebanonChaperonesPage")
                  }
                >
                  <Text style={styles.buttonText}>View Lebanon Chaperones</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => props.navigation.pop()}
          >
            <Text style={styles.buttonText}> Close </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MembersHome;
