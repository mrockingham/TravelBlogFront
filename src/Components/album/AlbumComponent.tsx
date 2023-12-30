import React, { useEffect, useState } from 'react';
import FileUpload from '../FileUpload';
import { getAllPhotos } from '../../config/api';
import { useUserStore } from '../../stores/useUserStore';
import { useImageStore } from '../../stores/useImageStore';
import {
  Stack,
  Image,
  Center,
  Flex,
  Wrap,
  WrapItem,
  Spinner,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Input,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const AlbumComponent = () => {
  const { editMode } = useUserStore((state: any) => state);
  const { getImages, imageData } = useImageStore((state: any) => state);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAlbumPhotos = async () => {
      const allAlbums = await getImages();

      setPhotos(allAlbums?.documents);
    };

    getAlbumPhotos();
  }, []);

  useEffect(() => {
    setPhotos(imageData);
  }, [imageData]);

  const [image, setImage] = useState<string | undefined>('');
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const {
    isOpen: isOpenModal1,
    onOpen: onOpenModal1,
    onClose: onCloseModal1,
  } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();

  return (
    <Box pb={2}>
      <Center>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Wrap flexWrap="wrap" justify="center">
            {photos?.map(
              (image: { url: string | undefined; $collectionId: string }) => (
                <Box key={image.$collectionId}>
                  <Skeleton isLoaded={imageLoaded}>
                    {editMode && (
                      <EditIcon
                        onClick={() => {
                          setId(image.$collectionId);
                          onOpenModal1();
                        }}
                      />
                    )}
                    <Image
                      onClick={() => {
                        setImage(image.url);
                        onOpenModal2();
                      }}
                      // key={image.name}
                      h={{ base: '200px', md: '400px', lg: '500px' }}
                      w={{ base: '200px', md: '400px', lg: '500px' }}
                      objectFit="cover"
                      src={image.url}
                      alt=""
                      onLoad={() => setImageLoaded(true)}
                      style={{ display: imageLoaded ? 'block' : 'none' }}
                    />
                  </Skeleton>
                </Box>
              )
            )}
          </Wrap>
        )}
        <Modal isOpen={isOpenModal1} onClose={onCloseModal1}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="description"
                onChange={e => setDescription(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  //   addImageDescription(id, discription);
                  onCloseModal2();
                }}
                variant="ghost"
              >
                Save Discription
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onCloseModal2}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
      <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image} alt="" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    // <Box>
    //   albumComponent
    //   <FileUpload />
    //   {photos?.documents?.map((data: any) => (
    //     <Box key={data.url}>
    //       <Image src={data.url} />
    //     </Box>
    //   ))}
    // </Box>
  );
};

export default AlbumComponent;
