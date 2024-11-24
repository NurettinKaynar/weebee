import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "@/lib/hooks/UseAppWrite";
import { SearchPosts } from "@/lib/api/Posts/SearchPosts";
import VideoCard from "@/components/VideoCard";
import HeaderComp from "@/components/HeaderComp";
import DataNotFound from "@/components/DataNotFound";
import SearchInput from "@/components/SearchInput";

const Search = () => {
  const { query }: { query: string } = useLocalSearchParams();
  const { data: posts, refetch }: any = useAppwrite(() => SearchPosts(query));
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };

  useEffect(() => {
    refetch();
  }, [query]);

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
            <HeaderComp />
            <SearchInput initialQuery={query} />
          </View>
        }
        ListEmptyComponent={
          <DataNotFound
            title="Video Bulunamadı"
            subtitle="İlk videoyu siz yükleyin"
            buttonTitle="Yeni Video Oluştur"
            onPress={() => {}}
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
