import { images } from "@/constants";
import { useGlobalContext } from "@/lib/context/GlobalProvider";
import React from "react";
import { Image, Text, View } from "react-native";

const HeaderComp: React.FC = () => {
  const { user, isLoggedIn }: any = useGlobalContext();
  return (
    <View className="flex flex-col gap-2 w-full ">
      <View className="flex flex-row w-full justify-between ">
        <View className="flex flex-col justify-center grow  px-2">
          <Text className="text-white font-pregular text-sm">
            Tekrar Hoşgeldiniz
          </Text>
          <Text className="text-white font-psemibold text-lg">
            {isLoggedIn && user && user.username}
          </Text>
        </View>
        <Image source={images.logo} className="w-20 h-20" />
      </View>
    </View>
  );
};

export default HeaderComp;
