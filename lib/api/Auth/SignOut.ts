import { client } from "@/lib/Appwrite";
import { Account } from "react-native-appwrite";

export async function signOut() {
  try {
    const account = new Account(client);
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(`Oturum sonlandırıldı ${error}`);
  }
}
