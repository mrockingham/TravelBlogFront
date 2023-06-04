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
  Textarea,
  Divider,
} from '@chakra-ui/react';

import { useEditStylesStore } from '../../stores/useEditStylesStore';
import { useImageStore } from '../../stores/useImageStore';
import { defaultAppStyles } from '../../config/defaultAppStyles';
import { ChromePicker } from 'react-color';

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    headerText:
      styleData[0]?.heroBox?.headerText || defaultAppStyles.heroBox.headerText,
    bodyText:
      styleData[0]?.heroBox?.bodyText || defaultAppStyles.heroBox.bodyText,
    backgroundImage:
      styleData[0]?.heroBox?.backgroundImage ||
      defaultAppStyles?.heroBox.backgroundImage,
    alignItems:
      styleData[0]?.heroBox?.headerAlign ||
      defaultAppStyles.heroBox.headerAlign,
    selectedImg: '',
    imgOpacity:
      styleData[0]?.heroBox?.backGroundImageOpacity ||
      defaultAppStyles?.heroBox.backgroundImageOpacity,
    isImgSelected: false,
    headerTextColor:
      styleData[0]?.heroBox?.headerTextColor ||
      defaultAppStyles?.heroBox.backgroundImage,
    bodyTextColor:
      styleData[0]?.heroBox?.bodyTextColor ||
      defaultAppStyles?.heroBox.bodyTextColor,
    bodyTextSize:
      styleData[0]?.heroBox?.bodyTextSize ||
      defaultAppStyles?.heroBox.bodyTextSize,
  });

  console.log('formData', formData);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateStyles({
      heroBox: {
        headerAlign: formData.alignItems,
        headerText: formData.headerText,
        headerTextColor: formData.headerTextColor,
        backgroundImage: formData.backgroundImage,
        backGroundImageOpacity: formData.imgOpacity,
        bodyText: formData.bodyText,
        bodyTextColor: formData.bodyTextColor,
        bodyTextSize: formData.bodyTextSize,
      },
    });

    getStyles();
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImgOpacityChange = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      imgOpacity: value,
    }));
  };

  const selectImg = (image: string) => {
    setFormData(prevState => ({
      ...prevState,
      selectedImg: image,
      isImgSelected: true,
    }));
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
            defaultValue={formData.alignItems}
            onChange={value =>
              handleInputChange({ target: { name: 'alignItems', value } })
            }
          >
            <Stack direction="row" mb="4">
              <Radio value="flex-start">Left</Radio>
              <Radio value="center">Center</Radio>
              <Radio value="flex-end">Right</Radio>
            </Stack>
          </RadioGroup>
          <Text fontWeight={500}>Header Title</Text>

          <Input
            type="text"
            id="value1"
            name="headerText"
            onChange={handleInputChange}
            value={formData.headerText}
            placeholder="Header Text"
            mb={2}
          />
          <Text>Header Title Color</Text>
          <ChromePicker
            color={formData.headerTextColor}
            onChange={updatedColor =>
              handleInputChange({
                target: { name: 'headerTextColor', value: updatedColor.hex },
              })
            }
          />
          <Divider mt={8} />

          <Text mt={4} fontWeight={500}>
            Body Text
          </Text>

          <Textarea
            id="value2"
            name="bodyText"
            onChange={handleInputChange}
            value={formData.bodyText}
            placeholder="Header Text"
            mb={2}
          />

          <Text>Header Body Text Size</Text>
          <Select
            name="bodyTextSize"
            value={formData.bodyTextSize}
            onChange={handleInputChange}
          >
            <option value="">Select option</option>
            {['sm', 'md', 'lg'].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <Text>Header Body Text Color</Text>
          <ChromePicker
            color={formData.bodyTextColor}
            onChange={updatedColor =>
              handleInputChange({
                target: { name: 'bodyTextColor', value: updatedColor.hex },
              })
            }
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
            src={formData.backgroundImage}
            alt="file"
            boxSize="300px"
            objectFit="cover"
            mb={2}
          />
          <Text>Background Img Opacity</Text>
          <Select value={formData.imgOpacity} onChange={handleImgOpacityChange}>
            <option value="">Select option</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap justify="center">
                  {imageData.map((image: { image: string | undefined }) => (
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
                          image.image === formData.selectedImg
                            ? { border: '4px solid blue' }
                            : { border: 'none' }
                        }
                      />
                    </Box>
                  ))}
                </Wrap>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => {
                    handleInputChange({
                      target: {
                        name: 'backgroundImage',
                        value: formData.selectedImg,
                      },
                    });
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
