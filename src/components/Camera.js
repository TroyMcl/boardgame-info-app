import React from "react";
import Webcam from "react-webcam";
import axios from 'axios';

const Camera = () => {
  const sendImage = (imageStr) => {
    axios.post('/image', {
      data: imageStr
    })
    .then(res => console.log('so something here', res.data))
    .catch(err => console.log('error', err))
  }

  const webcamRef = React.useRef(null);

  const captureImg = React.useCallback(
    () => {
      const imgSrc = webcamRef.current.getScreenshot()
      sendImage(imgSrc)
    },
    [webcamRef]
  );

  return (
    <div>
      <Webcam
        audio={false}
        height={500}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
        facingmodel="user"
      />
      <button onClick={captureImg}>Captuer Photo</button>
    </div>
  )
};

export default Camera;
