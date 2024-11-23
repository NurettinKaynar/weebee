import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps } from "react-native";

import { icons } from "../constants";
import { COLORS } from "@/constants/colors";
import clsx from "clsx";

interface Props extends TextInputProps {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (value: string) => void;
    otherStyles?: string;
    variant:"INPUT"|"PASSWORD";
    error?:string
}

const FormField:React.FC<Props> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={clsx("flex flex-col gap-2 ", props.otherStyles)}>
      <Text className="text-base text-gray-100 font-pmedium">{props.title}</Text>
      <View className={clsx("w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center",{"border-red-500":props.error})}>
        <TextInput
          className={clsx(
            "flex-1 text-white font-psemibold text-base"
          )}
          placeholderTextColor={COLORS.gray[100]}
          
          onChangeText={props.handleChangeText}
          secureTextEntry={props.variant === "PASSWORD" && !showPassword}
          {...props}
        />

        {props.variant === "PASSWORD"  && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
              />
          </TouchableOpacity>
        )}
      </View>
        {props.error&&<Text className="text-red-500" >{props.error}</Text>}
    </View>
  );
};

export default FormField;