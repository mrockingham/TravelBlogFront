import React, { useEffect } from 'react';
import { useImageStore } from '../../stores/useImageStore';
import { Stack, Image, Center, Flex, Wrap, WrapItem } from '@chakra-ui/react';

type Props = {};

const Imageview = (props: Props) => {
  const { imageData, getImages, getImage, error } = useImageStore(
    (state: any) => state
  );

  useEffect(() => {
    getImages();
  }, [getImages]);

  return (
    <>
      <Center>
        <Wrap justify="center">
          {imageData.map(
            (image: { image: string | undefined; name: string }) => {
              return (
                <Image
                  boxSize="150px"
                  objectFit="cover"
                  src={image.image}
                  alt=""
                />
              );
            }
          )}
        </Wrap>
      </Center>
    </>
  );
};

export default Imageview;
