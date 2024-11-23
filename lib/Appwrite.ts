import { Client } from "react-native-appwrite";

export const appWriteConfig={
    endpoint:process.env.EXPO_PUBLIC_API_URL||"",
    projectId:process.env.EXPO_PUBLIC_PROJECT_ID||"",
    platform:process.env.EXPO_PUBLIC_PLATFORM||"",
    databaseId:process.env.EXPO_PUBLIC_DATABASE_ID||"",
    userCollectionId:process.env.EXPO_PUBLIC_USER_COLLECTION_ID||"",
    videosId:process.env.EXPO_PUBLIC_VIDEOS_ID||"",
    storageId:process.env.EXPO_PUBLIC_STORAGE_ID||""
}

export const client = new Client()
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform)
    .setEndpoint(appWriteConfig.endpoint);
    