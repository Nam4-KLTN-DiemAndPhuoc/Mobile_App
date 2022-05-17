import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CommentItem from "../../components/comment/CommentItem";
import { Rating } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { addComment } from "../../redux/commentSlice";
import athApi from "../../api/authApi";
import Apploader from "../../components/Apploader";

export default function CommentScreen() {
  const { product } = useSelector((state) => state.product);
  const { comments } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const [star, setStar] = useState(5);
  const [textComment, setTextComment] = useState("");
  const [imageComment, setImageComment] = useState(null);
  const [loader, setLoader] = useState(false);
  const ratingCompleted = (rating) => {
    setStar(rating);
  };

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        return "";
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      // let picture = await fetch(result.uri);
      // picture = await picture.blob();
      if (!result.cancelled) {
        try {
          setImage(result.uri);
          setImageComment(result);
        } catch (e) {
          alert("ERROR");
        }
      }
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };

  const addComments = async () => {
    if (!user) {
      navigation.navigate("LoginScreen");
      return;
    }

    if (!textComment) {
      return;
    }

    setLoader(true);
    let imageUrl = "";
    if (imageComment) {
      const name = imageComment.uri.split("/")[11];

      const generateUploadURL = await athApi.generateUploadURL(name);

      await fetch(generateUploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "image",
        },
        body: imageComment,
      });

      imageUrl = generateUploadURL.split("?")[0];
    }

    const data = {
      point: star * 2,
      userId: user.id,
      productId: product.id,
      url: imageComment ? imageUrl : null,
      comment: textComment,
    };

    dispatch(addComment(data));
    setTextComment(" ");
    setImageComment(null);
    setImage(null);

    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        <View style={styles.product}>
          <Image
            source={{ uri: product.avatar }}
            style={{ width: 100, height: 100, borderRadius: 20 }}
          />
          <View style={styles.text}>
            <Text style={styles.textName}>{product.name} </Text>
            <Text>{product.price - product.price * product.discount} VNĐ</Text>
          </View>
        </View>

        <View>
          <Rating
            onFinishRating={(rating) => ratingCompleted(rating)}
            style={{ paddingVertical: 10 }}
            startingValue={5}
            imageSize={30}
          />
        </View>

        <View style={styles.comment}>
          <TouchableOpacity onPress={() => pickImage()}>
            <FontAwesome name="file-image-o" size={30} color="black" />
          </TouchableOpacity>
          <TextInput
            multiline={true}
            numberOfLines={3}
            style={{
              borderWidth: 1,
              width: 250,
              borderColor: "rgba(0,0,0,0.4)",
              borderRadius: 10,
            }}
            onChangeText={(text) => {
              setTextComment(text);
            }}
            defaultValue={textComment}
          />

          <TouchableOpacity
            style={styles.commentSend}
            onPress={() => addComments()}
          >
            <Feather
              name="send"
              size={30}
              color="white"
              style={{ padding: 5 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          {image ? (
            <View>
              <Image
                source={{ uri: image }}
                style={{ width: 150, height: 150, margin: 10 }}
              />
              <MaterialIcons
                name="cancel"
                size={24}
                color="red"
                style={{ position: "absolute", top: 10 }}
                onPress={() => handleClearImage()}
              />
            </View>
          ) : null}
        </View>
        {comments.length > 0 ? (
          <View>
            {comments.map((item, index) => (
              <CommentItem item={item} key={index} />
            ))}
          </View>
        ) : (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>Sản phẩm này chưa có đánh giá nào</Text>
          </View>
        )}
      </ScrollView>

      {loader ? <Apploader /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  product: {
    flexDirection: "row",
    margin: 5,
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 5,
    borderRadius: 10,
  },
  text: {
    marginLeft: 10,
    // justifyContent: "center",
  },
  textName: {
    fontWeight: "bold",
  },
  commentSend: {
    backgroundColor: "red",
    borderRadius: 20,
    marginRight: 10,
  },
  comment: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    justifyContent: "space-between",
  },
});
