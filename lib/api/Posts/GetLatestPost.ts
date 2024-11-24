import { appWriteConfig, client } from "@/lib/Appwrite";
import { Databases, Query } from "react-native-appwrite";

export const GetLatestPost = async () => {
  try {
    const databases = new Databases(client);
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(`Veri Bulunamadı ${error}`);
  }
};
