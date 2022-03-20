import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import SearchHeader from "../../components/header/SearchHeader";
import ListProductSearch from "../../components/search/ListProductSearch";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function SearchScreen({ route }) {
  const [page, setPage] = useState(1);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchHeader
          pageSearch={page}
          categorySelect={route.params?.itemValue}
        />
      </View>
      <View style={styles.listItem}>
        <ListProductSearch page={page} setPage={setPage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#C4C4C4", height: "100%" },
  header: { height: 150 },
  listItem: {
    height: windowHeight - 160,
  },
});
