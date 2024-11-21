import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "@/constants";
import TabIcon from "@/components/TabIcon";
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingTop: 5,
            width: "100%",
            height: 50,
            backgroundColor: "white",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Ana Sayfa",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                focused={focused}
                name="Ana Sayfa"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
