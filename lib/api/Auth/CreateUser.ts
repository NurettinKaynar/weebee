import { Account, Databases, ID } from "react-native-appwrite";
import { appWriteConfig, client } from "../../Appwrite";
import { initialAvatar } from "../User/Avatar";
import { loginUser } from "./Login";

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const account = new Account(client);
    const databases = new Databases(client);
    const createAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!createAccount) throw new Error("Kullanıcı oluşturulamadı");
    const AvatarUrls = await initialAvatar(username);
    await loginUser(email, password);
    const newUser = await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: createAccount.$id,
        email: email,
        username: username,
        avatar: AvatarUrls,
      }
    );
    return newUser;
  } catch (error) {}
};
