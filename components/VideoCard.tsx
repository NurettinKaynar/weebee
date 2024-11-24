import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { icons } from "@/constants";
interface Props {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  videoUrl: string;
}
const VideoCard: React.FC<Props> = (props) => {
  const [play, setPlay] = useState(false);

  const player = useVideoPlayer(props.videoUrl, (player) => {
    player.play();

    player.addListener("playToEnd", () => {
      setPlay(false);
    });
  });
  return (
    <View className="flex flex-col items-center px-4 mb-14 gap-3">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: props.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}>
              {props.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}>
              {props.creator}
            </Text>
          </View>
        </View>
      </View>

      {play ? (
        <VideoView
          shouldRasterizeIOS
          className="w-full h-60 rounded-xl  bg-white/10 "
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            width: "100%",
            height: 200,
            borderRadius: 33,
          }}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center">
          <Image
            source={{ uri: props.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
