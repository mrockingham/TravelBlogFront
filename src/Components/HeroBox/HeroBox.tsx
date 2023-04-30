import { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useUsersStore } from '../../stores/useUsersStore';
import FileUpload from '../FileUpload/FileUpload';
import axios from '../../config/AxiosConfig';

type Props = {
  height?: number | string;
  state?: any;
};

const HeroBox = (props: Props) => {
  const users = useUsersStore((state: any) => state?.data);
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
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
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('imgageFile', imageFile);
  console.log('imageName', imageName);

  return (
    <Box
      textAlign="center"
      h={props.height}
      backgroundImage={`url('https://lh3.googleusercontent.com/pw/AJFCJaWPlHX9_uVoeNkhWudtXdeni-zUNPCfFouycdUS3Cwu6GuYtBceWiKjKTZFcLvRgJQvrptDHH70dbuQ9OIN6qQi9UfaDIpPJahtMYYJrUQlL4kDuCVH3diA-ljTVmir2SjyjwFHSDm9eqkSvuzQfE1kDXasuK8D6FaLcJ2rShZtRKdb8vjLAM-QlYQeRBDGhUzpO_Kk7rPvEcr_CWT9gFX1R7gQxtc9CXHD87jGGDCbUnQ44dAPP8FzCqvQcoKqSFy2139v7LuupdGcMp0lCfe0IMQWBBbDueVK8b149E7boOb-1v_a7N5BJ3b713SccXx0l0Eo3xRiKnDCfFWKQvc-UOYBoloMgue5Z97BhsLhNOIfMBCof5EiVXNMm1I6MExl6bbBMqo0ChtS2h8XQK8sPafLHV_94szztHyLtmfa7dtOiVG38qLFPnZEwJo6IsSilPwcmRD_VDXJvI2MPZF-WpIfP43dyQ1RpRDi8LTtK88kctU_gt5roAthLsP0bDUnxqg_F3d5Xp_sGJ1EC4cfnZAEmYpVeqVDiiOE4cl2jQ8a5DDues61JE9D9ebL8NFtRA0rNnA-tH4i-MbbgCGfHufq3PnVlj8qcvenr1D22XiEExr3GsMDmy2ljQuhoDh3i9J4VfDbh1qOEfH4GLaucUU7gSFPyWxYQQOdt1-TIF7_KoDkIIxZyGnfSEeGgJ7YtMNGon3SQFglh6PM2TTDmK-lZnQMebUtqekEMsx85vCnOWDjQovyBXcVZuxJ3VV9lu7TZS2deXkmfnIZB34Ux8BKLPi4FNF3NLJFtUS8Taif-UfnDgjDPbDPfSox5JlLeQQCDEuqqtf56rKJsxlOKRmrrKm20DJsA-UD-rB8-YNAsMImTTLEgV6a7o72HkNG9hcCxSpBFxkCXum-SC-IMzuSE528_XrBcnLQaoaMiRZLOJK2WoxvVaLh=w3841-h1239-s-no?authuser=0')`}
      backgroundPosition={'center bottom'}
    >
      TravelBlog
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={imageName}
            onChange={e => e.target.value && setImageName(e.target.value)}
          />
        </div>
        <div>
          <FileUpload
            name="image"
            label="Upload Image"
            value={imageFile}
            type="image"
            handleInputState={value => {
              setImageFile(value);
              setImageName(value.name);
            }}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};

export default HeroBox;

// const [inputValue, setInputValue] = useState('');
// const [data, setData] = useState({
//   name: '',
//   img: '',
// });

// console.log('data', data);

// const handleChange = ({
//   currentTarget: input,
// }: React.ChangeEvent<HTMLInputElement>) => {
//   setData({ ...data, [input.name]: input.value });
// };

// const handleInputState = (name: any, value: any) => {
//   setData(prev => ({ ...prev, [name]: value }));
// };

// const handleSubmit = async (e: { preventDefault: () => void }) => {
//   e.preventDefault();
//   try {
//     const { data: res } = await axios.post('/images', data);
//     console.log(res);
//   } catch (error) {
//     console.log(error);
//   }
// };

// return (
//   <Box
//     textAlign="center"
//     h={props.height}
//     backgroundImage={`url('https://lh3.googleusercontent.com/pw/AJFCJaWPlHX9_uVoeNkhWudtXdeni-zUNPCfFouycdUS3Cwu6GuYtBceWiKjKTZFcLvRgJQvrptDHH70dbuQ9OIN6qQi9UfaDIpPJahtMYYJrUQlL4kDuCVH3diA-ljTVmir2SjyjwFHSDm9eqkSvuzQfE1kDXasuK8D6FaLcJ2rShZtRKdb8vjLAM-QlYQeRBDGhUzpO_Kk7rPvEcr_CWT9gFX1R7gQxtc9CXHD87jGGDCbUnQ44dAPP8FzCqvQcoKqSFy2139v7LuupdGcMp0lCfe0IMQWBBbDueVK8b149E7boOb-1v_a7N5BJ3b713SccXx0l0Eo3xRiKnDCfFWKQvc-UOYBoloMgue5Z97BhsLhNOIfMBCof5EiVXNMm1I6MExl6bbBMqo0ChtS2h8XQK8sPafLHV_94szztHyLtmfa7dtOiVG38qLFPnZEwJo6IsSilPwcmRD_VDXJvI2MPZF-WpIfP43dyQ1RpRDi8LTtK88kctU_gt5roAthLsP0bDUnxqg_F3d5Xp_sGJ1EC4cfnZAEmYpVeqVDiiOE4cl2jQ8a5DDues61JE9D9ebL8NFtRA0rNnA-tH4i-MbbgCGfHufq3PnVlj8qcvenr1D22XiEExr3GsMDmy2ljQuhoDh3i9J4VfDbh1qOEfH4GLaucUU7gSFPyWxYQQOdt1-TIF7_KoDkIIxZyGnfSEeGgJ7YtMNGon3SQFglh6PM2TTDmK-lZnQMebUtqekEMsx85vCnOWDjQovyBXcVZuxJ3VV9lu7TZS2deXkmfnIZB34Ux8BKLPi4FNF3NLJFtUS8Taif-UfnDgjDPbDPfSox5JlLeQQCDEuqqtf56rKJsxlOKRmrrKm20DJsA-UD-rB8-YNAsMImTTLEgV6a7o72HkNG9hcCxSpBFxkCXum-SC-IMzuSE528_XrBcnLQaoaMiRZLOJK2WoxvVaLh=w3841-h1239-s-no?authuser=0')`}
//     backgroundPosition={'center bottom'}
//   >
//     TravelBlog
//     <form onSubmit={handleSubmit}>
//       <div>
//         <input
//           type="text"
//           name="name"
//           value={data.name}
//           onChange={handleChange}
//         />
//       </div>
//       <div>
//         <FileUpload
//           name="image"
//           label="Upload Image"
//           value={data.img}
//           type="image"
//           handleInputState={handleInputState}
//         />
//       </div>
//       <Button type="submit">Submit</Button>
//     </form>
//   </Box>
// );
