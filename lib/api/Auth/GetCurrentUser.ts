import { appWriteConfig, client } from "@/lib/Appwrite";
import { Databases, Query } from "react-native-appwrite";
import { GetAccount } from "./GetAccount";

export const GetCurrentUser = async () => {
  try {
    const account = await GetAccount();
    if (!account) throw new Error("Kullanıcı Bulunamadı");
    const database = new Databases(client);
    const currentUser = await database.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      [Query.equal("accountId", account.$id)]
    );
    if (!currentUser) throw new Error("Kullanıcı Bulunamadı");
    return currentUser.documents[0];
  } catch (error) {
    console.error("Kullanıcı Hatası", error);
    throw new Error("Kullanıcı Bulunamadı");
  }
};
