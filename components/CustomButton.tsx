import clsx from "clsx";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface Props{
    title: string;
    handlePress: () => void;
    containerStyles?:string;
    textStyles?:string;
    isLoading?: boolean;
}

const CustomButton:React.FC<Props> = (props) => {
  
  
  return (
    <TouchableOpacity
      onPress={props.handlePress}
      activeOpacity={0.7}
    className={clsx(" w-full bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center",props.containerStyles,{
        "opacity-50": props.isLoading,})}
      disabled={props.isLoading}
    >
      <Text  className={clsx("text-white font-psemibold text-lg grow text-center ",props.textStyles)}>
        {props.title}
      </Text>

      {props.isLoading && (
        <ActivityIndicator
          animating={props.isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

