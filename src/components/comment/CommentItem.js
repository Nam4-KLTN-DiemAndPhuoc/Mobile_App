import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { Avatar, Rating } from "react-native-elements";

export default function CommentItem({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Avatar
          rounded
          size={40}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXB-Z2vmokUNTs-TEFAewEMskBYOEYPJYbZAdmdwfDQF_shESRgg5wElh-aDzrngNZpEM&usqp=CAU",
          }}
        />
        <Text style={styles.textNameUser}>
          {item.user.userName} -{" "}
          <Text style={{ fontWeight: "normal" }}>
            {item.comment.point / 2}
            <Image
              source={{
                uri: "https://github.com/tranhonghan/images/blob/main/star_filled.png?raw=true",
              }}
              style={{ marginLeft: 10, width: 20, height: 20 }}
            />
          </Text>
        </Text>
      </View>
      <View></View>
      <View style={styles.comment}>
        <Text>{item?.comment?.comment}</Text>
        {item?.comment?.url ? (
          <Image
            source={{
              uri: item?.comment?.url,
            }}
            style={{ width: 150, height: 150 }}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    margin: 5,
    borderRadius: 30,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  textNameUser: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  comment: {
    padding: 5,
    marginLeft: 20,
  },
});
