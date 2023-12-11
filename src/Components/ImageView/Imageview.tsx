import React, { useEffect, useState } from 'react';
import { useImageStore } from '../../stores/useImageStore';
import { useUsersStore } from '../../stores/useUsersStore';
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

type Props = {};

const Imageview = (props: Props) => {
  const { imageData, getImages, addImageDescription, isLoading } =
    useImageStore((state: any) => state);
  const { data, getUsers, editMode, isEditMode } = useUsersStore(
    (state: any) => state
  );
  const [image, setImage] = useState<string | undefined>('');

  const [discription, setDiscription] = useState('');
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

  useEffect(() => {
    getImages();
  }, [getImages]);

  console.log('imageData', imageData);

  return (
    <Box h="500px">
      <Center>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Wrap overflowY="auto" flexWrap="wrap" h="600px" justify="center">
            {imageData.map(
              (image: {
                image: string | undefined;
                name: string;
                _id: string;
                description: string;
              }) => (
                <Box>
                  <Skeleton key={image.name} isLoaded={!isLoading}>
                    {editMode && (
                      <EditIcon
                        onClick={() => {
                          setId(image._id);
                          onOpenModal1();
                        }}
                      />
                    )}
                    <Image
                      onClick={() => {
                        setImage(image.image);
                        onOpenModal2();
                      }}
                      // key={image.name}
                      h={{ base: '200px', md: '400px', lg: '500px' }}
                      w={{ base: '200px', md: '400px', lg: '500px' }}
                      objectFit="cover"
                      src={image.image}
                      alt=""
                    />
                    <Box>{image?.description}</Box>
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
                placeholder="discription"
                onChange={e => setDiscription(e.target.value)}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => {
                  addImageDescription(id, discription);
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
            <Image
              // key={image.name}

              src={image}
              alt=""
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCloseModal2}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Imageview;
