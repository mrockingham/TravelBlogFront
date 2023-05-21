import React, { useState, useEffect } from 'react';
import {
  DrawerBody,
  DrawerHeader,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Input,
  FormLabel,
  DrawerFooter,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Wrap,
  Box,
  Select,
} from '@chakra-ui/react';

import { useEditStylesStore } from '../../stores/useEditStylesStore';
import { useImageStore } from '../../stores/useImageStore';
import { defaultAppStyles } from '../../config/defaultAppStyles';

type Props = {
  placement?: string;
  setPlacement?: any;
};

const EditTopBarNav = (props: Props) => {
  const { styleData, getStyles, updateStyles, stylesError } =
    useEditStylesStore((state: any) => state);
  const { imageData, getImages, getImage, error } = useImageStore(
    (state: any) => state
  );
  const [headerText, setHeaderText] = useState(
    styleData[0]?.heroBox?.headerText || defaultAppStyles.heroBox.headerText
  );
  const [backgroundImage, setBackgrounImage] = useState(
    styleData[0]?.heroBox?.backgroundImage ||
      defaultAppStyles?.heroBox.backgroundImage
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [alignItems, setAlignItems] = React.useState(
    styleData[0]?.heroBox?.headerAlign || defaultAppStyles.heroBox.headerAlign
  );
  const [selectedImg, setSelectedImg] = useState('');
  const [imgOpacity, setImgOpacity] = useState(
    styleData[0]?.heroBox?.backgroundImageOpacity ||
      defaultAppStyles?.heroBox.backgroundImageOpacity
  );
  const [isImgSelected, setIsImgSelected] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    updateStyles({
      heroBox: {
        headerAlign: alignItems,
        headerText: headerText,
        backgroundImage: backgroundImage,
        backGroundImageOpacity: `255, 255, 255, 0.${imgOpacity}`,
      },
    });

    getStyles();
  };
  const handleImgOpacityChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setImgOpacity(event.target.value);
  };

  const selectImg = (image: string) => {
    setSelectedImg(image);
    setIsImgSelected(true);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <DrawerHeader borderBottomWidth="1px">
          Edit Hero Box
          {/* <Text>Edit Location</Text>
          <RadioGroup
            defaultValue={props.placement}
            onChange={() => props.setPlacement}
          >
            <Stack direction="row" mb="4">
              <Radio value="top">Top</Radio>
              <Radio value="bottom">Bottom</Radio>
            </Stack>
          </RadioGroup> */}
        </DrawerHeader>
        <DrawerBody>
          <Text>Align Main Header</Text>
          <RadioGroup
            defaultValue={
              styleData[0]?.heroBox?.headerAlign ||
              defaultAppStyles.heroBox.headerAlign
            }
            onChange={setAlignItems}
          >
            <Stack direction="row" mb="4">
              <Radio value="flex-start">Left</Radio>
              <Radio value="center">Center</Radio>
              <Radio value="flex-end">Right</Radio>
            </Stack>
          </RadioGroup>
          <Text>Header Title</Text>
          <FormLabel>Link 1</FormLabel>
          <Input
            type="text"
            id="value1"
            name="value1"
            onChange={e => setHeaderText(e.target.value)}
            value={headerText}
            placeholder="Nav Link Names"
            mb={2}
          />
          <Text>Background Img</Text>
          <Button
            onClick={() => {
              onOpen();
              getImages();
            }}
          >
            Select Img
          </Button>
          <Image
            src={
              backgroundImage ||
              styleData[0]?.heroBox?.backgroundImage ||
              defaultAppStyles?.heroBox.backgroundImage
            }
            alt="file 
        "
            boxSize="300px"
            objectFit="cover"
            mb={2}
          />
          <Text>Background Img Opacity</Text>
          <Select
            value={imgOpacity}
            placeholder="Select option"
            onChange={handleImgOpacityChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3 </option>
            <option value="4">4 </option>
            <option value="5">5 </option>
            <option value="6">6 </option>
            <option value="7">7 </option>
            <option value="8">8 </option>
            <option value="9">9 </option>
          </Select>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap justify="center">
                  {imageData.map(
                    (image: { image: string | undefined; name: string }) => {
                      console.log(image.image);
                      return (
                        <Box
                          onClick={() => {
                            selectImg(image?.image || '');
                            console.log('clicked', image.image);
                          }}
                        >
                          <Image
                            boxSize="150px"
                            objectFit="cover"
                            src={image.image}
                            alt=""
                            style={
                              image.image === selectedImg
                                ? { border: '4px solid blue' }
                                : { border: 'none' }
                            }
                          />
                        </Box>
                      );
                    }
                  )}
                </Wrap>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => {
                    setBackgrounImage(selectedImg);
                    onClose();
                  }}
                  variant="ghost"
                >
                  Save Img
                </Button>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </DrawerBody>
        <DrawerFooter>
          <Button type="submit">Save</Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default EditTopBarNav;
