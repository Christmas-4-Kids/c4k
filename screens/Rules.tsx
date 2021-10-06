import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView, View, Text, Button } from "react-native";
import styles from "../styles";
import firestore from "@react-native-firebase/firestore";

const Rules = (props) => {
  const [rules, setRules] = useState(null);
  useEffect(() => {
    let ruleList = [];
    const unsubscribe = firestore()
      .collection("rules")
      .orderBy("order")
      .onSnapshot({
        error: (e) => console.error(e),
        next: (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let d = doc.data();
            d.id = doc.id;
            ruleList.push(d);
          });
          setRules(ruleList);
        },
      });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.sectionContainer}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {!!rules &&
            rules.map((rule) => (
              <View style={styles.sectionContainer} key={rule.id}>
                <Text style={styles.sectionTitle}>{rule.title}</Text>
                <Text style={styles.sectionDescription}>
                  {rule.description}
                </Text>
              </View>
            ))}
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

export default Rules;
