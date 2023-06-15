import React, { useState } from 'react';

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
  Flex,
} from '@chakra-ui/react';

import { useEditStylesStore } from '../../stores/useEditStylesStore';
import { useImageStore } from '../../stores/useImageStore';
import { defaultAppStyles } from '../../config/defaultAppStyles';
import { ChromePicker } from 'react-color';
import ReactQuill from 'react-quill';
import { ExternalLinkIcon } from '@chakra-ui/icons';

type Props = {
  placement?: string;
  setPlacement?: any;
};

const EditMiddleContentBox = (props: Props) => {
  const { styleData, getStyles, updateStyles, stylesError } =
    useEditStylesStore((state: any) => state);
  const { imageData, getImages } = useImageStore((state: any) => state);

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
  const {
    isOpen: isOpenModal3,
    onOpen: onOpenModal3,
    onClose: onCloseModal3,
  } = useDisclosure();

  const [formData, setFormData] = useState({
    headerText:
      styleData[0]?.MiddleContentBox?.headerText ||
      defaultAppStyles.MiddleContentBox.headerText,
    headerFontStyle:
      styleData[0]?.MiddleContentBox?.headerFontStyle ||
      defaultAppStyles.MiddleContentBox.headerFontStyle,
    bodyText:
      styleData[0]?.MiddleContentBox?.bodyText ||
      defaultAppStyles.MiddleContentBox.bodyText,
    backgroundImage1:
      styleData[0]?.MiddleContentBox?.backgroundImage1 ||
      defaultAppStyles?.MiddleContentBox.backgroundImage1,
    backgroundImage2:
      styleData[0]?.MiddleContentBox?.backgroundImage2 ||
      defaultAppStyles?.MiddleContentBox.backgroundImage2,
    alignItems:
      styleData[0]?.MiddleContentBox?.headerAlign ||
      defaultAppStyles.MiddleContentBox.headerAlign,
    selectedImg1: '',
    selectedImg2: '',
    imgOpacity:
      styleData[0]?.heroBox?.backGroundImageOpacity ||
      defaultAppStyles?.heroBox.backgroundImageOpacity,
    isImgSelected: false,
    headerTextColor:
      styleData[0]?.MiddleContentBox?.headerTextColor ||
      defaultAppStyles?.MiddleContentBox.headerTextColor,
    bodyTextColor:
      styleData[0]?.MiddleContentBox?.bodyTextColor ||
      defaultAppStyles?.MiddleContentBox.bodyTextColor,
    bodyTextSize:
      styleData[0]?.MiddleContentBox?.bodyTextSize ||
      defaultAppStyles?.MiddleContentBox.bodyTextSize,
  });

  console.log('formData', formData);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateStyles({
      MiddleContentBox: {
        headerAlign: formData.alignItems,
        headerText: formData.headerText,
        headerFontStyle: formData.headerFontStyle,
        headerTextColor: formData.headerTextColor,
        backgroundImage1: formData.backgroundImage1,
        backgroundImage2: formData.backgroundImage2,
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

  const handleTextChange = (value: React.SetStateAction<string>) => {
    setFormData(prevState => ({
      ...prevState,
      headerText: value,
    }));
  };
  const handleBodyTextChange = (value: React.SetStateAction<string>) => {
    setFormData(prevState => ({
      ...prevState,
      bodyText: value,
    }));
  };

  const selectImg = (image: string, imgNumber: number) => {
    if (imgNumber === 1) {
      setFormData(prevState => ({
        ...prevState,
        selectedImg1: image,
        isImgSelected: true,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        selectedImg2: image,
        isImgSelected: true,
      }));
    }
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],

      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
  ];
  return (
    <div>
      <form onSubmit={onSubmit}>
        <DrawerHeader borderBottomWidth="1px">
          Edit Middle Content Box
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
          <Text as="b">Align Middle Content Header</Text>
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
          <Box>
            <Text as="b">Middle Content Header Title</Text>

            <ReactQuill
              onChange={handleTextChange}
              value={formData.headerText}
              modules={modules}
              formats={formats}
            />
          </Box>
          <Box mt={2}>
            <Text as="b">Middle Content Header Fonts</Text>
            <Flex alignItems={'center'}>
              <Text style={{ fontFamily: formData.headerFontStyle }}>
                Font Style
              </Text>
              <Box mt={1}>
                <ExternalLinkIcon
                  mb={'10px'}
                  ml={1}
                  onClick={() => {
                    onOpenModal1();
                  }}
                />
              </Box>
            </Flex>
            <Modal isOpen={isOpenModal1} onClose={onCloseModal1}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader style={{ fontFamily: formData.headerFontStyle }}>
                  Font Styles
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <RadioGroup
                    onChange={value =>
                      handleInputChange({
                        target: { name: 'headerFontStyle', value },
                      })
                    }
                    value={formData.headerFontStyle}
                    name="headerFontStyle"
                  >
                    <Stack direction="column">
                      <Radio value="Droid Sans">
                        <Text style={{ fontFamily: 'Droid Sans' }}>
                          Droid Sans
                        </Text>
                      </Radio>
                      <Radio value="Chilanka">
                        <Text style={{ fontFamily: 'Chilanka' }}>Chilanka</Text>
                      </Radio>
                      <Radio value="Roboto">
                        <Text style={{ fontFamily: 'Roboto' }}>Roboto</Text>
                      </Radio>
                      <Radio value="DM Sans">
                        <Text style={{ fontFamily: 'DM Sans' }}>DM Sans</Text>
                      </Radio>
                      <Radio value="Inter">
                        <Text style={{ fontFamily: 'Inter' }}>Inter</Text>
                      </Radio>
                      <Radio value="Space Mono">
                        <Text style={{ fontFamily: 'Space Mono' }}>
                          Space Mono
                        </Text>
                      </Radio>
                      <Radio value="Space Grotesk">
                        <Text style={{ fontFamily: 'Space Grotesk' }}>
                          Space Grotesk
                        </Text>
                      </Radio>
                      <Radio value="Work Sans">
                        <Text style={{ fontFamily: 'Work Sans' }}>
                          Work Sans
                        </Text>
                      </Radio>
                      <Radio value="Syne">
                        <Text style={{ fontFamily: 'Syne' }}>Syne</Text>
                      </Radio>
                      <Radio value="Libre Franklin">
                        <Text style={{ fontFamily: 'Libre Franklin' }}>
                          Libre Franklin
                        </Text>
                      </Radio>
                      <Radio value="Cormorant">
                        <Text style={{ fontFamily: 'Cormorant' }}>
                          Cormorant
                        </Text>
                      </Radio>
                      <Radio value="Fira Sans">
                        <Text style={{ fontFamily: 'Fira Sans' }}>
                          Fira Sans
                        </Text>
                      </Radio>
                      <Radio value="Eczar">
                        <Text style={{ fontFamily: 'Eczar' }}>Eczar</Text>
                      </Radio>
                      <Radio value="Alegreya Sans">
                        <Text style={{ fontFamily: 'Alegreya Sans' }}>
                          Alegreya Sans
                        </Text>
                      </Radio>
                      <Radio value="Alegreya">
                        <Text style={{ fontFamily: 'Alegreya' }}>Alegreya</Text>
                      </Radio>
                      <Radio value="Source Sans Pro">
                        <Text style={{ fontFamily: 'Source Sans Pro' }}>
                          Source Sans Pro
                        </Text>
                      </Radio>
                      <Radio value="Source Serif Pro">
                        <Text style={{ fontFamily: 'Source Serif Pro' }}>
                          Source Serif Pro
                        </Text>
                      </Radio>
                      <Radio value="Comic Neue">
                        <Text style={{ fontFamily: 'Comic Neue' }}>
                          Comic Neue
                        </Text>
                      </Radio>
                      <Radio value="Dancing Script">
                        <Text style={{ fontFamily: 'Dancing Script' }}>
                          Dancing Script
                        </Text>
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onCloseModal1}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
          {/* <Input
            type="text"
            id="value1"
            name="headerText"
            onChange={handleInputChange}
            value={formData.headerText}
            placeholder="Header Text"
            mb={2}
          /> */}
          <Text as="b">Middle Content Header Title Color</Text>
          <ChromePicker
            color={formData.headerTextColor}
            onChange={updatedColor =>
              handleInputChange({
                target: { name: 'headerTextColor', value: updatedColor.hex },
              })
            }
          />
          <Divider mt={8} />
          <Text mt={4} as="b">
            Body Text
          </Text>

          <ReactQuill
            onChange={handleBodyTextChange}
            value={formData.bodyText}
            modules={modules}
            formats={formats}
          />
          <Box mt={2}>
            <Text as="b">Middle Content Body Text Size</Text>
          </Box>
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
          <Box mt={2}>
            <Text as="b">Middle Content Body Text Color</Text>
            <ChromePicker
              color={formData.bodyTextColor}
              onChange={updatedColor =>
                handleInputChange({
                  target: { name: 'bodyTextColor', value: updatedColor.hex },
                })
              }
            />
          </Box>
          <Box mt={3}>
            <Text as="b">Img 1</Text>
          </Box>
          <Button
            mt={2}
            mb={2}
            onClick={() => {
              onOpenModal2();
              getImages();
            }}
          >
            Select Img 1
          </Button>
          <Image
            src={formData.backgroundImage1}
            alt="file"
            boxSize="300px"
            objectFit="cover"
            mb={2}
          />
          <Modal isOpen={isOpenModal2} onClose={onCloseModal2}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap justify="center">
                  {imageData.map((image: { image: string | undefined }) => (
                    <Box
                      onClick={() => {
                        selectImg(image?.image || '', 1);
                        console.log('clicked', image.image);
                      }}
                    >
                      <Image
                        boxSize="150px"
                        objectFit="cover"
                        src={image.image}
                        alt=""
                        style={
                          image.image === formData.selectedImg1
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
                        name: 'backgroundImage1',
                        value: formData.selectedImg1,
                      },
                    });
                    onCloseModal2();
                  }}
                  variant="ghost"
                >
                  Save Img
                </Button>
                <Button colorScheme="blue" mr={3} onClick={onCloseModal2}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Box mt={3}>
            <Text as="b">Img 2</Text>
          </Box>
          <Button
            mt={2}
            mb={2}
            onClick={() => {
              onOpenModal3();
              getImages();
            }}
          >
            Select Img 2
          </Button>
          <Image
            src={formData.backgroundImage2}
            alt="file"
            boxSize="300px"
            objectFit="cover"
            mb={2}
          />
          <Modal isOpen={isOpenModal3} onClose={onCloseModal3}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modal Title</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Wrap justify="center">
                  {imageData.map((image: { image: string | undefined }) => (
                    <Box
                      onClick={() => {
                        selectImg(image?.image || '', 2);
                        console.log('clicked', image.image);
                      }}
                    >
                      <Image
                        boxSize="150px"
                        objectFit="cover"
                        src={image.image}
                        alt=""
                        style={
                          image.image === formData.selectedImg2
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
                        name: 'backgroundImage2',
                        value: formData.selectedImg2,
                      },
                    });
                    onCloseModal3();
                  }}
                  variant="ghost"
                >
                  Save Img
                </Button>
                <Button colorScheme="blue" mr={3} onClick={onCloseModal3}>
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

export default EditMiddleContentBox;