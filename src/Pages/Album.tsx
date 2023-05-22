import { useState, useEffect, SetStateAction } from 'react';
import FileUpload from '../Components/FileUpload/FileUpload';
import Imageview from '../Components/ImageView/Imageview';
import axios from '../config/AxiosConfig';
import { Box, Button, Center, Flex, Text, useToast } from '@chakra-ui/react';
import { useImageStore } from '../stores/useImageStore';
import { useUsersStore } from '../stores/useUsersStore';

type Props = {};

const Album = (props: Props) => {
  const { imageData, getImages, getImage, error } = useImageStore(
    (state: any) => state
  );
  const toast = useToast();
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [uploadeImagefile, setUploadImageFile] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data, getUsers, editMode, isEditMode } = useUsersStore(
    (state: any) => state
  );
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log('data', data);

  const handleSubmit = async () => {
    const url = imageFile;
    const regex = /images%(.+?)\?alt/;
    const match = url.match(regex);
    const result = match ? match[1] : null;
    try {
      const res = await axios.post(
        '/images',
        {
          name: `${result}`,
          image: `${imageFile}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('rexblog-token')}`,
          },
        }
      );
      setUploadImageFile('');
      if (res.status === 200) {
        toast({
          title: 'Image Uploaded.',
          description: 'Image Uploaded.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        getImages();
      }
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: 'Image Not Uploaded.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (uploadeImagefile.length > 0) {
      handleSubmit();
    }
  }, [uploadeImagefile]);

  return (
    <Flex justifyContent={'center'}>
      <Box
      //   textAlign="center"
      //   backgroundImage={`url('https://firebasestorage.googleapis.com/v0/b/blogreixne.appspot.com/o/images%2F1682846871238beachBackground.jpg?alt=media&token=5d971fe7-c8d2-4e00-873d-9e5690a78709')`}
      //   backgroundPosition={'center bottom'}
      >
        <Center>
          <Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>
            All Images
          </Text>
        </Center>
        <form>
          <div>
            {/* <input
              type="text"
              value={imageName}
              onChange={e => e.target.value && setImageName(e.target.value)}
            /> */}
          </div>
          <div>
            {data?.name && (
              <FileUpload
                name="image"
                label="Upload Image"
                value={imageFile}
                type="image"
                handleInputState={value => {
                  setImageFile(value);
                  setImageName(value.name);
                }}
                uploadedImage={(value: SetStateAction<string>) =>
                  setUploadImageFile(value)
                }
                handleProgress={value => setUploadProgress(value)}
              />
            )}
          </div>
        </form>

        <Imageview />
      </Box>
    </Flex>
  );
};

export default Album;
