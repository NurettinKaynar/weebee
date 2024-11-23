import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "@/constants";
import TabIcon from "@/components/TabIcon";
import { COLORS } from "@/constants/colors";
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor:COLORS.secondary[100],
          tabBarInactiveTintColor: COLORS.gray[100],

          tabBarStyle: {
           backgroundColor:COLORS.primary,
           borderTopWidth:1,
           borderTopColor:COLORS.gray[100],
           height:60,
           display:"flex",
           flexDirection:"row",
           justifyContent:"space-between",
           alignItems:"flex-start",
           paddingTop:15
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
        <Tabs.Screen
          name="create"
          options={{
            headerShown: false,
            title: "Oluştur",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                focused={focused}
                name="Oluştur"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profil",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                focused={focused}
                name="Profil"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            headerShown: false,
            title: "Kayıtlar",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                focused={focused}
                name="Kayıtlar"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
