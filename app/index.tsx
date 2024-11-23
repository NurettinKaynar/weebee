import CustomButton from "@/components/CustomButton";
import { useGLobalContext } from "@/lib/context/GlobalProvider";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";

const Welcome = () => {
  const { isLoading, isLoggedIn }: any = useGLobalContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.push("/home");
    }
  }, [isLoading, isLoggedIn]);
  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-col justify-center items-center px-4">
          <View className="flex flex-col items-center justify-center">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-32 h-32"
            />
            <Text className="text-white font-psemibold text-2xl">Weebee</Text>
          </View>
          <Image
            source={images.cards}
            resizeMode="contain"
            className="max-w-[380px] w-full h-[300px]"
          />
          <View className="w-full justify-center items-center gap-2 mt-5">
            <Text className="text-white text-3xl font-psemibold text-center">
              Weebee ile size özel yapay zeka sosyal medya araçlarını keşfedin
            </Text>
            <Text className="text-white text-lg font-pregular text-center ">
              Yaratıcılığın İnovasyonla Buluştuğu Yer: Weebee ile Sınırsız Keşif
              Yolculuğuna Çıkın
            </Text>
            <CustomButton
              title="Giriş Yap"
              handlePress={() => router.push("/SignIn")}
              containerStyles="mt-7"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
