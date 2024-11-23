import { client } from "@/lib/Appwrite";
import { Account } from "react-native-appwrite";

export const GetAccount = async () => {
  try {
    const account = new Account(client);
    const user = await account.get();
    if (!user) throw new Error("Kullanıcı Bulunamadı");
    return user;
  } catch (error) {
    throw new Error("Kullanıcı Bulunamadı");
  }
};
