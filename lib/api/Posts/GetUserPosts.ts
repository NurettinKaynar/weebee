import { appWriteConfig, client } from "@/lib/Appwrite";
import { Databases, Query } from "react-native-appwrite";

export async function GetUserPosts(userId: string) {
  try {
    const database = new Databases(client);
    const posts = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.videosId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(`Gönderi bulunamadı ${error}`);
  }
}
