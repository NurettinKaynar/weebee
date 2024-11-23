import { client } from "@/lib/Appwrite"
import { Account, Avatars } from "react-native-appwrite"



export const initialAvatar=async(username:string)=>{
    try {
        const avatar=new Avatars(client)
        const getUrl=await avatar.getInitials(username)
        if(!getUrl) throw new Error("Avatar Bulunamadı");
        return getUrl
        
    } catch (error) {
        throw new Error("Avatar Bulunamadı");
    }
}