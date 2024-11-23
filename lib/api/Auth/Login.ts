import { Account } from "react-native-appwrite"
import { client } from "../../Appwrite"

export const loginUser = (email: string, password: string) => {
    const account=new Account(client)
    return account.createEmailPasswordSession(email,password)
}