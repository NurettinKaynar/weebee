import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const App = () => {
  return (
    <View className=" flex-1 flex items-center justify-center">
      <Text>index</Text>
      <Link href="/profile" style={{ color: "blue" }}>
        Profile Git
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
