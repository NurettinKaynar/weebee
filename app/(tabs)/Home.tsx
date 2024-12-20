import { View, Text, Image, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import HeaderComp from "@/components/HeaderComp";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import DataNotFound from "@/components/DataNotFound";
import { getAllPosts } from "@/lib/api/Posts/GetPostList";
import useAppwrite from "@/lib/hooks/UseAppWrite";
import VideoCard from "@/components/VideoCard";
import { GetLatestPost } from "@/lib/api/Posts/GetLatestPost";
import { router, usePathname } from "expo-router";

const Home = () => {
  const { data: posts, refetch }: any = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(GetLatestPost);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const pathname = usePathname();
  const [query, setQuery] = useState<string>("");
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
              <SearchInput initialQuery={query} />
            </View>
            <View className="flex flex-col w-full justify-between ">
              <Text className="text-white font-psemibold text-lg pt-10">
                En Son Yüklenenler
              </Text>
              <Trending posts={latestPosts} />
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

export default Home;
