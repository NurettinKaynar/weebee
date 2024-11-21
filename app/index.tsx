import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className=" flex-1 flex items-center justify-center">
      <Text>index</Text>
      <Link href="/home" style={{ color: "blue" }}>
        taba git
      </Link>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
