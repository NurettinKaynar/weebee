import { appWriteConfig, client } from "@/lib/Appwrite";
import { ID, Storage } from "react-native-appwrite";
import { getFilePreview } from "./GetFilePreview";

export async function uploadFile(file: Blob | any, type: string) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const storage = new Storage(client);
    const uploadedFile = await storage.createFile(
      appWriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
