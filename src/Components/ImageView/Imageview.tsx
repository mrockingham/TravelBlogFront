import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';

type Props = {};

const Imageview = (props: Props) => {
  const { imageData, getImages, getImage, error, isLoading } = useImageStore(
    (state: any) => state
  );
  const [image, setImage] = useState<string | undefined>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getImages();
  }, [getImages]);

  console.log('isLoading', isLoading);

  return (
    <>
      <Center>
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Wrap justify="center">
            {imageData.map(
              (image: { image: string | undefined; name: string }) => (
                <Skeleton key={image.name} isLoaded={!isLoading}>
                  <Image
                    onClick={() => {
                      setImage(image.image);
                      onOpen();
                    }}
                    // key={image.name}
                    boxSize="150px"
                    objectFit="cover"
                    src={image.image}
                    alt=""
                  />
                </Skeleton>
              )
            )}
          </Wrap>
        )}
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Imageview;
