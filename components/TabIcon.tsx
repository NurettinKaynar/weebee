import { Image, Text, View } from "react-native";
import clsx from "clsx";
interface tabIcon {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<tabIcon> = (props) => {
  return (
    <View className=" w-[60px]  flex flex-col items-center justify-center gap-2">
      <Image source={props.icon} tintColor={props.color} className="w-6 h-6" />
      <Text
        className={clsx("text-xs", {
          "font-psemibold": props.focused,
          "font-pregular": !props.focused,
        })}>
        {props.name}
      </Text>
    </View>
  );
};

export default TabIcon;
