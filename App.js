import React from "react";
import { Provider } from "react-redux";
import { LogBox } from "react-native";
import store from "./src/redux/store";
import Root from "./src/Root";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
export default function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
