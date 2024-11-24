import { appWriteConfig, client } from "@/lib/Appwrite";
import { Databases } from "react-native-appwrite";

export const getAllPosts = async () => {
  try {
    const databases = new Databases(client);
    const posts = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(`Veri Bulunamadı ${error}`);
  }
};
