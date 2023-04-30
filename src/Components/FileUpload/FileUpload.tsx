import { useRef, useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import storage from '../../config/firebase';
import BeachBackground from '../../assets/images/beach-background.jpg';
import { Box, Button } from '@chakra-ui/react';

type Props = {
  name: string;
  label: string;
  value: any;
  type: string;
  handleInputState: (e: any) => any;
};

const FileUpload = (props: Props) => {
  const { name, label, value, type, handleInputState, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  console.log('handleInputState', handleInputState);

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
      },
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          handleInputState(url);
          setProgressShow(false);
        });
      }
    );
  };

  return (
    <Box>
      <Box display="none">
        <input
          type="file"
          ref={inputRef}
          onChange={e => handleInputState(e.currentTarget?.files?.[0] || '')}
        />
      </Box>
      <Button onClick={() => inputRef.current?.click()}>{label}</Button>
      {type === 'image' && value && (
        <img
          src={typeof value === 'string' ? value : URL.createObjectURL(value)}
          alt="file 
            "
          width="100%"
        />
      )}
      <Button onClick={handleUpload}>upload</Button>
    </Box>
  );
};
export default FileUpload;
