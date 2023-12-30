import { useRef, useState } from 'react';
import {
  Box,
  Button,
  Progress,
  Image,
  Center,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useImageStore } from '../stores/useImageStore';
import { useUserStore } from '../stores/useUserStore';

import imageCompression from 'browser-image-compression';

const FileUpload = () => {
  const {
    getImages,

    saveUrl,
    addFile,
    getFilePreview,
    isLoading,
  } = useImageStore((state: any) => state);
  const { data } = useUserStore((state: any) => state);
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const toast = useToast();

  const handleUpload = async () => {
    if (image !== null) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(image, options);

        const file = new File([compressedFile], compressedFile.name, {
          type: compressedFile.type,
        });

        // Upload the image
        try {
          if (file) {
            const response = await addFile(file);
            const getPhoto = await getFilePreview(response?.$id || '');
            const uploadPhoto = await saveUrl({
              id: getPhoto?.$id || '',
              name: name ? name : '',
              url: getPhoto?.href || '',
              description: description || '',
            });
            getImages();
            setImage(null);
            toast({
              title: 'Sucess',
              description: 'Image has been uploaded.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            return uploadPhoto;
          }
        } catch (err) {
          console.log(err);
          toast({
            title: 'Something Went Wrong',
            description: err,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }

        // console.log('uploaded picture', uploadPhoto);
      } catch (err) {
        console.log(err);
        setImage(null);
      }
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
              <Button
                isLoading={isLoading}
                loadingText="Saving"
                variant="outline"
                mb={2}
                onClick={handleUpload}
              >
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
          data && (
            <Button
              isLoading={isLoading}
              variant="outline"
              mb={2}
              onClick={() => inputRef.current?.click()}
            >
              Select File
            </Button>
          )
        )}
      </Center>
      <Center>
        <Box>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="Uploaded File"
              boxSize="300px"
              objectFit="cover"
              mb={2}
            />
          )}
          <Center>
            <Button mb={2} variant="outline" onClick={() => setImage(null)}>
              Clear
            </Button>
          </Center>
        </Box>
      </Center>
      <Center></Center>
    </Box>
  );
};

export default FileUpload;
