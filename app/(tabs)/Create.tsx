import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import { useGlobalContext } from "@/lib/context/GlobalProvider";
import * as DocumentPicker from "expo-document-picker";
import { createVideoPost } from "@/lib/api/Posts/CreateVideoPosts";
import { router } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";

const Create = () => {
  const [play, setPlay] = useState(false);

  const { user }: any = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<any>({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const player = useVideoPlayer(form.video, (player) => {
    player.play();

    player.addListener("playToEnd", () => {
      setPlay(false);
    });
  });
  const submit = async () => {
    if (
      form.prompt === "" ||
      form.title === "" ||
      !form.thumbnail ||
      !form.video
    ) {
      return Alert.alert("Lütfen tüm alanları doldurun");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Başarılı", "Gönderi başarıyla yüklendi");
      router.push("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        // Alert.alert("Belge Seçildi", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Video Yükle</Text>

        <FormField
          variant="INPUT"
          title="Video Adı"
          value={form.title}
          placeholder="Video'na özel isim ver"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Videoyu Yükle
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
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
              // <Video
              //   source={{ uri: form.video.uri }}
              //   className="w-full h-64 rounded-2xl"
              //   useNativeControls
              //   resizeMode={ResizeMode.COVER}
              //   isLooping
              // />
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Küçük Resim
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Dosya Seç
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Prompt'u Giriniz"
          variant="INPUT"
          value={form.prompt}
          placeholder="Yapay Zeka Prompt'unu Giriniz"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Gönder & Paylaş"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
