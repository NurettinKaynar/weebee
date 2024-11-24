import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import VideoCard from "@/components/VideoCard";
import { icons } from "@/constants";
import DataNotFound from "@/components/DataNotFound";
import { useGlobalContext } from "@/lib/context/GlobalProvider";
import useAppwrite from "@/lib/hooks/UseAppWrite";
import { router } from "expo-router";
import Infobox from "@/components/Infobox";
import { signOut } from "@/lib/api/Auth/SignOut";
import { GetUserPosts } from "@/lib/api/Posts/GetUserPosts";

const Profile = () => {
  const { user, setUser, setIsLogged, isLoggedIn }: any = useGlobalContext();
  const { data: posts } = useAppwrite(() => GetUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/SignIn");
  };
  return (
    <SafeAreaView className="bg-primary h-full pt-10">
      <FlatList
        data={posts}
        keyExtractor={(item: any, idx) => String(idx)}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            videoUrl={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <DataNotFound
            title="Video Bulunamadı"
            subtitle="İlk videoyu siz yükleyin"
            buttonTitle="Yeni Video Oluştur"
            onPress={() => router.push("/create")}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10">
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user && user.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <Infobox
              title={user && user.username}
              subtitle={user && user.email}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <Infobox
                title={String(posts.length) || "0"}
                subtitle="Gönderi"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
