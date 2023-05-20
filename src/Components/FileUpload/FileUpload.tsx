import { useRef, useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../config/firebase';
import BeachBackground from '../../assets/images/beach-background.jpg';
import { Box, Button, Progress, Image, Center } from '@chakra-ui/react';
import { useImageStore } from '../../stores/useImageStore';

type Props = {
  name: string;
  label: string;
  value: any;
  type: string;
  handleInputState: (e: any) => any;
  handleProgress: (e: any) => any;
  uploadedImage: any;
};

const FileUpload = (props: Props) => {
  const { imageData, getImages, getImage, error } = useImageStore(
    (state: any) => state
  );
  const {
    name,
    label,
    value,
    type,
    handleInputState,
    handleProgress,
    uploadedImage,
  } = props;

  console.log('value', value);

  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const handleUpload = async (e: any) => {
    setProgressShow(true);
    const fileName = new Date().getTime() + value.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, value);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
        handleProgress(uploaded);
      },
      error => {
        return;
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          handleInputState(url);
          uploadedImage(url);
          setProgressShow(false);
          handleProgress(0);
        });
      }
    );
  };

  useEffect(() => {
    if (progress === 100) {
      getImages();
      setProgress(0);
    }
  }, [getImages, progress]);

  return (
    <Box>
      <Box display="none">
        <input
          type="file"
          ref={inputRef}
          onChange={e => handleInputState(e.currentTarget?.files?.[0] || '')}
        />
      </Box>
      <Center>
        <Button mb={2} onClick={() => inputRef.current?.click()}>
          {label}
        </Button>
      </Center>
      <Center>
        {type === 'image' && value && (
          <Image
            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
            alt="file 
        "
            boxSize="300px"
            objectFit="cover"
            mb={2}
          />
        )}
      </Center>
      <Center>
        {value && (
          <Button mb={2} onClick={handleUpload}>
            upload
          </Button>
        )}
      </Center>
      {progress > 0 && <Progress mb={2} value={progress} />}
      {/* <Button onClick={getImages()}>get images</Button> */}
    </Box>
  );
};
export default FileUpload;
