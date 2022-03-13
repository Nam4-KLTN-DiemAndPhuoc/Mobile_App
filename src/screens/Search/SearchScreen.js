import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchHeader from "../../components/header/SearchHeader";
import SearchBody from "../../components/search/SearchBody";
import SearchFilter from "../../components/search/SearchFilter";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchHeader />
      </View>
      <View>
        <SearchFilter />
      </View>
      <View>
        <SearchBody />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#C4C4C4", height: "100%" },
  header: { height: 100 },
  filter: {
    height: "15%",
    backgroundColor: "#F08F5F",
  },
});
