import { appWriteConfig, client } from "@/lib/Appwrite";
import { ImageGravity, Storage } from "react-native-appwrite";

export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;

  try {
    const storage = new Storage(client);
    if (type === "video") {
      fileUrl = storage.getFileView(appWriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appWriteConfig.storageId,
        fileId,
        2000,
        2000,
        ImageGravity.Top,
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(`Dosya zorunu ${error}`);
  }
}
