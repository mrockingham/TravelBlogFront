import { Client, Account, Databases, Storage, Avatars } from "appwrite";


export const appWriteConfig = {
    projectId: process.env.REACT_APP_APPWRITE_PROJECT_ID,
    url: process.env.REACT_APP_APPWRITE_URL,
    databasesId: process.env.REACT_APP_APPWRITE_DATABASE_ID,
    storageId: process.env.REACT_APP_APPWRITE_STORAGE_ID,
    userCollectionId: process.env.REACT_APP_APPWRITE_COLLECTION_USERS_ID,
    stylesCollectionId: process.env.REACT_APP_APPWRITE_COLLECTION_STYLES_ID,
    photosCollectionId: process.env.REACT_APP_APPWRITE_COLLECTION_PHOTOS_ID,
    heroBoxCollectionId: process.env.REACT_APP_APPWRITE_COLLECTION_HEROBOX_ID,
    heroBoxBodyCollectionId: process.env.REACT_APP_APPWRITE_COLLECTION_HEROBOXBODY_ID,
    middleContentBoxCollectionId: process.env.REACT_APP_APPWRITE_COLLECTION_MIDDLECONTENTBOX_ID,
    middleContentBoxBodyCollectionId: process.env.REACT_APP_APPWRITE_COLLECTION_MIDDLECONTENTBOXBODY_ID,


}

export const client = new Client()
client.setProject(appWriteConfig.projectId)
client.setEndpoint(appWriteConfig.url)
export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)