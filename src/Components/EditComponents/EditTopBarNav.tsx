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

import { useEditStylesStore } from '../../stores/useEditStylesStore';

type Props = {
  placement?: string;
  setPlacement?: any;
};

const EditTopBarNav = (props: Props) => {
  const { styleData, getStyles, updateStyles, stylesError } =
    useEditStylesStore((state: any) => state);
  const [Link1, setLink1] =
    React.useState(styleData[0]?.topBarNavLinks[0]) || 'Link1';
  const [Link2, setLink2] =
    React.useState(styleData[0]?.topBarNavLinks[1]) || 'Link2';
  const [Link3, setLink3] =
    React.useState(styleData[0]?.topBarNavLinks[2]) || 'Link3';
  const [alignItems, setAlignItems] = React.useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    updateStyles({
      topBarNavAlign: alignItems,
      topBarNavLinks: [Link1, Link2, Link3],
    });

    getStyles();
  };
  console.log('link1', Link1);
  console.log('link2', Link2);
  console.log('link3', Link3);
  return (
    <div>
      <form onSubmit={onSubmit}>
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
            onChange={setAlignItems}
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
            id="value1"
            name="value1"
            onChange={e => setLink1(e.target.value)}
            value={Link1}
            placeholder="Nav Link Names"
            mb={2}
          />
          <FormLabel>Link 2</FormLabel>
          <Input
            type="text"
            id="value1"
            name="value1"
            onChange={e => setLink2(e.target.value)}
            value={Link2}
            placeholder="Nav Link Names"
            mb={2}
          />
          <FormLabel>Link 3</FormLabel>
          <Input
            type="text"
            id="value1"
            name="value1"
            onChange={e => setLink3(e.target.value)}
            value={Link3}
            placeholder="Nav Link Names"
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
