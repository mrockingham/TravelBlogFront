import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  height?: number | string;
};

const HeroBox = (props: Props) => {
  return (
    <Box
      textAlign="center"
      h={props.height}
      backgroundImage={`url('https://lh3.googleusercontent.com/pw/AJFCJaWPlHX9_uVoeNkhWudtXdeni-zUNPCfFouycdUS3Cwu6GuYtBceWiKjKTZFcLvRgJQvrptDHH70dbuQ9OIN6qQi9UfaDIpPJahtMYYJrUQlL4kDuCVH3diA-ljTVmir2SjyjwFHSDm9eqkSvuzQfE1kDXasuK8D6FaLcJ2rShZtRKdb8vjLAM-QlYQeRBDGhUzpO_Kk7rPvEcr_CWT9gFX1R7gQxtc9CXHD87jGGDCbUnQ44dAPP8FzCqvQcoKqSFy2139v7LuupdGcMp0lCfe0IMQWBBbDueVK8b149E7boOb-1v_a7N5BJ3b713SccXx0l0Eo3xRiKnDCfFWKQvc-UOYBoloMgue5Z97BhsLhNOIfMBCof5EiVXNMm1I6MExl6bbBMqo0ChtS2h8XQK8sPafLHV_94szztHyLtmfa7dtOiVG38qLFPnZEwJo6IsSilPwcmRD_VDXJvI2MPZF-WpIfP43dyQ1RpRDi8LTtK88kctU_gt5roAthLsP0bDUnxqg_F3d5Xp_sGJ1EC4cfnZAEmYpVeqVDiiOE4cl2jQ8a5DDues61JE9D9ebL8NFtRA0rNnA-tH4i-MbbgCGfHufq3PnVlj8qcvenr1D22XiEExr3GsMDmy2ljQuhoDh3i9J4VfDbh1qOEfH4GLaucUU7gSFPyWxYQQOdt1-TIF7_KoDkIIxZyGnfSEeGgJ7YtMNGon3SQFglh6PM2TTDmK-lZnQMebUtqekEMsx85vCnOWDjQovyBXcVZuxJ3VV9lu7TZS2deXkmfnIZB34Ux8BKLPi4FNF3NLJFtUS8Taif-UfnDgjDPbDPfSox5JlLeQQCDEuqqtf56rKJsxlOKRmrrKm20DJsA-UD-rB8-YNAsMImTTLEgV6a7o72HkNG9hcCxSpBFxkCXum-SC-IMzuSE528_XrBcnLQaoaMiRZLOJK2WoxvVaLh=w3841-h1239-s-no?authuser=0')`}
      backgroundPosition={'center bottom'}
    >
      TravelBlog
    </Box>
  );
};

export default HeroBox;
