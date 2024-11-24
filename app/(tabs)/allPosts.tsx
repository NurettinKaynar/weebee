import {
  View,
  Text,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import useAppwrite from "@/lib/hooks/UseAppWrite";
import { getAllPosts } from "@/lib/api/Posts/GetPostList";
import DataNotFound from "@/components/DataNotFound";
import HeaderComp from "@/components/HeaderComp";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import VideoCard from "@/components/VideoCard";
import { router } from "expo-router";

const allPosts = () => {
  const { data: posts, refetch }: any = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  return (
    <SafeAreaView className="flex-1 bg-primary h-full pt-10 px-2">
      <FlatList
        data={posts}
        keyExtractor={(item, idx) => String(item.$id)}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            videoUrl={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={
          <View className="flex flex-col gap-2 w-full">
            <View className="flex flex-col">
              <HeaderComp />
            </View>
          </View>
        }
        ListEmptyComponent={
          <DataNotFound
            title="Video Bulunamadı"
            subtitle="İlk videoyu siz yükleyin"
            buttonTitle="Yeni Video Oluştur"
            onPress={() => router.push("/create")}
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default allPosts;
