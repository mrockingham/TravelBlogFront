import { useRef, useState, useEffect } from 'react';
import { Box, Button, Progress, Image, Center, Input } from '@chakra-ui/react';
import { useImageStore } from '../stores/useImageStore';
import { uploadFile, getFileId, savePhotoUrl } from '../config/api';

const FileUpload = () => {
  const {
    getImages,
    getImage,
    updateDescription,
    deleteFile,
    saveUrl,
    addFile,
    getFilePreview,
  } = useImageStore((state: any) => state);
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const handleUpload = async () => {
    if (image !== null) {
      // Upload the image
      const response = await addFile(image);
      const getPhoto = await getFilePreview(response?.$id || '');
      const uploadPhoto = await saveUrl({
        id: getPhoto?.$id || '',
        name: name ? name : '',
        url: getPhoto?.href || '',
        description: description || '',
      });

      console.log('uploaded picture', uploadPhoto);
      setImage(null);
      return uploadFile;

      // After uploading, you might want to fetch the image or update state accordingly
      // For example, if your API returns the uploaded image URL, you can do:
      // setImage(response.imageUrl);
    } else {
      alert('No file is uploaded');
    }
  };

  return (
    <Box>
      <Box display="none">
        <input
          type="file"
          ref={inputRef}
          onChange={e => setImage(e.currentTarget?.files?.[0] || '')}
        />
      </Box>
      <Center>
        {image ? (
          <Box>
            <Center>
              <Button variant="outline" mb={2} onClick={handleUpload}>
                Upload
              </Button>
            </Center>
            <Center>
              <Box p={2} color="white">
                <Input
                  m={2}
                  placeholder="Name"
                  onChange={e => setName(e.currentTarget?.value || '')}
                />
                <Input
                  m={2}
                  placeholder="Description"
                  onChange={e => setDescription(e.currentTarget?.value || '')}
                />
              </Box>
            </Center>
          </Box>
        ) : (
          <Button
            variant="outline"
            mb={2}
            onClick={() => inputRef.current?.click()}
          >
            Select File
          </Button>
        )}
      </Center>
      <Center>
        {image && (
          <Image
            src={URL.createObjectURL(image)}
            alt="Uploaded File"
            boxSize="300px"
            objectFit="cover"
            mb={2}
          />
        )}
      </Center>
      <Center></Center>
    </Box>
  );
};

export default FileUpload;
