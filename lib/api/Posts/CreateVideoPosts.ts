import { Databases, ID } from "react-native-appwrite";
import { uploadFile } from "./UploadFile";
import { appWriteConfig, client } from "@/lib/Appwrite";

export async function createVideoPost(form: any) {
  try {
    const databases = new Databases(client);
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.videosId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
