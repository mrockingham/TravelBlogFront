import React from 'react';
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
} from '@chakra-ui/react';
import { useEditStylesStore } from '../../../stores/useEditStylesStore';
import { ChromePicker } from 'react-color';
import { defaultAppStyles } from '../../../config/defaultAppStyles';
import { useForm } from 'react-hook-form';

type Props = {
  placement?: string;
  setPlacement?: any;
};

type FormData = {
  link1: string;
  link2: string;
  link3: string;
  alignItems: string;
  backgroundColor: string;
};

const EditTopBarNav = (props: Props) => {
  const { styleData, getStyles, updateStyles } = useEditStylesStore(
    (state: any) => state
  );
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>({
    defaultValues: {
      link1: styleData[0]?.topBarNavLinks[0] || 'Link1',
      link2: styleData[0]?.topBarNavLinks[1] || 'Link2',
      link3: styleData[0]?.topBarNavLinks[2] || 'Link3',
      alignItems: '',
      backgroundColor:
        styleData[0]?.backgroundColor ||
        defaultAppStyles?.styles?.backgroundColor,
    },
  });

  const values = getValues();

  console.log('the values', values);
  const onSubmit = () => {
    // updateStyles({
    //   topBarNavAlign: data.alignItems,
    //   topBarNavLinks: [data.link1, data.link2, data.link3],
    //   backgroundColor: data.backgroundColor,
    // });

    getStyles();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DrawerHeader borderBottomWidth="1px">Edit Top Bar</DrawerHeader>
        <DrawerBody>
          <Text>Edit Location</Text>
          <RadioGroup
            defaultValue={props.placement}
            onChange={() => props.setPlacement}
          >
            <Stack direction="row" mb="4">
              <Radio value="top">Top</Radio>
              <Radio value="bottom">Bottom</Radio>
            </Stack>
          </RadioGroup>

          <Text>Align Nav Link</Text>
          <RadioGroup
            defaultValue={styleData[0]?.topBarNavAlign}
            onChange={value => setValue('alignItems', value)}
          >
            <Stack direction="row" mb="4">
              <Radio value="flex-start">Left</Radio>
              <Radio value="center">Center</Radio>
              <Radio value="flex-end">Right</Radio>
            </Stack>
          </RadioGroup>
          <Text>Nav Link Names</Text>
          <FormLabel>Link 1</FormLabel>
          <Input
            type="text"
            id="link1"
            {...register('link1')}
            placeholder="Nav Link Names"
            mb={2}
          />
          <FormLabel>Link 2</FormLabel>
          <Input
            type="text"
            id="link2"
            {...register('link2')}
            placeholder="Nav Link Names"
            mb={2}
          />
          <FormLabel>Link 3</FormLabel>
          <Input
            type="text"
            id="link3"
            {...register('link3')}
            placeholder="Nav Link Names"
          />
          <Text>Background Color</Text>
          <ChromePicker
            color={values.backgroundColor || styleData[0]?.backgroundColor}
            onChange={updatedColor =>
              setValue('backgroundColor', updatedColor.hex)
            }
          />
        </DrawerBody>
        <DrawerFooter>
          <Button type="submit">Save</Button>
        </DrawerFooter>
      </form>
    </div>
  );
};

export default EditTopBarNav;
