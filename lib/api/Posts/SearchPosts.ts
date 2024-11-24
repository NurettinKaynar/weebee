import { appWriteConfig, client } from "@/lib/Appwrite";
import { Databases, Query } from "react-native-appwrite";

export const SearchPosts = async (query: string) => {
  console.log("gelen", query);

  try {
    const databases = new Databases(client);
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosId,
      [Query.search("title", query), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(`Veri Bulunamadı ${error}`);
  }
};
