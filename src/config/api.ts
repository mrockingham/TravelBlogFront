import { INewUser } from '../types';
import { ID, Query } from 'appwrite';
import { account, appWriteConfig, databases, storage } from './config';



export const createUserAccount = async (user: INewUser) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );
        if (!newAccount) throw Error;

        const newUser = await saveUserToDB({
            id: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
        });

        return newUser;
    } catch (error) {
        throw new Error(error)
    }
};

export const saveUserToDB = async (user: {
    id: string;
    name: string;
    email: string;
}) => {
    try {
        const newUser = await databases.createDocument(
            appWriteConfig.databasesId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            user
        );

        return newUser;
    } catch (error) {
        console.log(error);
    }
};

export const SignInAccount = async (user: {
    email: string;
    password: string;
}) => {
    // const { getError } = useUsersStore((state: any) => state);
    // const navigate = useNavigate();
    try {
        const session = await account.createEmailSession(user.email, user.password);
        console.log('session data', session);
        // navigate('/');
        return session;
    } catch (error) {

        throw new Error(error);
    }
};

export const getAccount = async () => {
    try {
        const currentAccount = await account.get();
        return currentAccount;
    } catch (error) {
        console.log(error);
    }
};

export const signOutAccount = async () => {
    try {
        const session = account.deleteSessions();
        console.log('session data logout', session);
        return session;
    } catch (error) {
        console.log(error);
    }
};

export const uploadFile = async (file: File) => {
    try {
        const uploadedFile = await storage.createFile(
            appWriteConfig.storageId,
            ID.unique(),
            file
        );
        return uploadedFile;
    } catch (err) {
        console.log(err);
    }
};

export const getFileId = async (data: string) => {
    try {
        const getFile = await storage.getFilePreview(
            appWriteConfig.storageId,
            data
        )
        console.log('file info', getFile)

        return getFile
    } catch (err) {
        console.log(err)
    }
}

export const savePhotoUrl = async (photo: {
    id: string;
    name: string;
    url: string;
    description: string;
}) => {
    try {
        const newUser = await databases.createDocument(
            appWriteConfig.databasesId,
            appWriteConfig.photosCollectionId,
            ID.unique(),
            photo
        );

        return newUser;
    } catch (error) {
        console.log(error);
    }
};

export const getAllPhotos = async () => {
    try {
        const getPhotos = await databases.listDocuments(
            appWriteConfig.databasesId,
            appWriteConfig.photosCollectionId,
            [Query.select(['url', 'description'])]
        )

        return getPhotos
    } catch (err) {

        console.log(err)
    }

}

export const getPhoto = async (id: string) => {
    try {
        const photo = await databases.getDocument(
            appWriteConfig.databasesId,
            appWriteConfig.photosCollectionId,
            id
        )

        return photo
    } catch (err) {
        console.log(err)
    }
}

export const updatePhoto = async (id: string, data: any) => {
    try {
        const updatedPhoto = await databases.updateDocument(

            appWriteConfig.databasesId,
            appWriteConfig.photosCollectionId,
            id,
            {
                name: data.name,
                description: data.description
            }
        )
        return updatedPhoto
    } catch (err) {
        console.log(err)
    }
}
export const deletePhoto = async (id: string) => {
    try {
        const deletedPhoto = await databases.deleteDocument(

            appWriteConfig.databasesId,
            appWriteConfig.photosCollectionId,
            id
        )
        return deletedPhoto
    } catch (err) {
        console.log(err)
    }
}
