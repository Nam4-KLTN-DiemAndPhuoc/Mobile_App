import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchHeader from "../../components/header/SearchHeader";
import SearchFilter from "../../components/search/SearchFilter";

export default function SearchScreen() {
  return (
    <View>
      <View style={styles.header}>
        <SearchHeader />
      </View>
      <View>
        <SearchFilter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 100 },
  filter: {
    height: "15%",
    backgroundColor: "#F08F5F",
  },
});
