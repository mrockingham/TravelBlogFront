
import { appWriteConfig, databases } from './config';


export const updateStylesDB = async (id: string, data: any) => {
    try {
        const updateStyles = await databases.updateDocument(
            appWriteConfig.databasesId,
            appWriteConfig.stylesCollectionId,
            id,
            data

        )

        return updateStyles
    } catch (err) {
        throw new Error(err)
    }
}

export const getStyles = async () => {
    try {
        const styles = await databases.listDocuments(
            appWriteConfig.databasesId,
            appWriteConfig.stylesCollectionId,

        )

        return styles
    } catch (err) {
        throw new Error(err)
    }
}

export const updateHeroBoxDB = async (data: any) => {
    console.log('updatehero info id', data.id);
    console.log('updatehero info data', data.data);
    try {
        const updateHeroBox = await databases.updateDocument(
            appWriteConfig.databasesId,
            appWriteConfig.heroBoxCollectionId,
            data.id,
            data.data

        )

        return updateHeroBox
    } catch (err) {
        throw new Error(err)
    }
}

export const getHeroBox = async () => {
    try {
        const heroBox = await databases.listDocuments(
            appWriteConfig.databasesId,
            appWriteConfig.heroBoxCollectionId,

        )

        return heroBox
    } catch (err) {
        throw new Error(err)
    }
}
export const updateHeroBoxBodyDB = async (data: any) => {
    try {
        const updateHeroBoxBody = await databases.updateDocument(
            appWriteConfig.databasesId,
            appWriteConfig.heroBoxBodyCollectionId,
            data.id,
            data.data

        )

        return updateHeroBoxBody
    } catch (err) {
        throw new Error(err)
    }
}

export const getHeroBoxBody = async () => {
    try {
        const heroBoxBody = await databases.listDocuments(
            appWriteConfig.databasesId,
            appWriteConfig.heroBoxBodyCollectionId,

        )

        return heroBoxBody
    } catch (err) {
        throw new Error(err)
    }
}
export const updateMiddleContentBoxDB = async (data: any) => {

    console.log('updating data', data)
    try {
        const updateMiddleContentBox = await databases.updateDocument(
            appWriteConfig.databasesId,
            appWriteConfig.middleContentBoxCollectionId,
            data.id,
            data.data

        )

        return updateMiddleContentBox
    } catch (err) {
        throw new Error(err)
    }
}

export const getMiddleContentBox = async () => {
    try {
        const middleContentBox = await databases.listDocuments(
            appWriteConfig.databasesId,
            appWriteConfig.middleContentBoxCollectionId,

        )

        return middleContentBox
    } catch (err) {
        throw new Error(err)
    }
}
export const updateMiddleContentBoxBodyDB = async (data: any) => {
    try {
        const updateMiddleContentBoxBody = await databases.updateDocument(
            appWriteConfig.databasesId,
            appWriteConfig.middleContentBoxBodyCollectionId,
            data.id,
            data.data

        )

        return updateMiddleContentBoxBody
    } catch (err) {
        throw new Error(err)
    }
}

export const getMiddlecontentBodyBox = async () => {
    try {
        const middleContentBodyBox = await databases.listDocuments(
            appWriteConfig.databasesId,
            appWriteConfig.middleContentBoxBodyCollectionId,
        )

        return middleContentBodyBox
    } catch (err) {
        throw new Error(err)
    }
} 