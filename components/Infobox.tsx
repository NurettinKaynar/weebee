import { View, Text } from "react-native";
import React from "react";
import clsx from "clsx";

interface Props {
  title: string;
  subtitle: string;
  containerStyles?: string;
  titleStyles?: string;
}

const Infobox: React.FC<Props> = (props) => {
  return (
    <View className={props.containerStyles}>
      <Text
        className={clsx(
          "text-white text-center font-psemibold ",
          props.titleStyles
        )}>
        {props.title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {props.subtitle}
      </Text>
    </View>
  );
};

export default Infobox;
