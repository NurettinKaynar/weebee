import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";

interface Props {
  title: string;
  subtitle: string;
  onPress: () => void;
  buttonTitle: string;
}

const DataNotFound: React.FC<Props> = (props) => {
  return (
    <View className="flex flex-col justify-center items-center">
      <Image source={images.empty} resizeMode="contain" className="w-40 h-40" />
      <View className="flex flex-col items-center justify-center px-2 gap-2">
        <Text className="text-white font-psemibold text-lg">{props.title}</Text>
        <Text className="text-white font-pregular text-lg">
          {props.subtitle}
        </Text>
        <CustomButton title={props.buttonTitle} handlePress={props.onPress} />
      </View>
    </View>
  );
};

export default DataNotFound;
