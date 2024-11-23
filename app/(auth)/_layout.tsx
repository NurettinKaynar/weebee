
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const AuthLayout = () => {
  return (
    <>
    <Stack screenOptions={{ 
      headerShown: false,
      statusBarStyle: "light",
      statusBarBackgroundColor:"transparent",
      statusBarTranslucent: true
    }}>
      <Stack.Screen name="SignIn" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} />
    </Stack>
   
    </>
  );
};

export default AuthLayout;
