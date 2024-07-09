import { storage,db } from './firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from 'react';
import { v4 } from "uuid";
import { doc, setDoc,Timestamp } from "firebase/firestore"; 

function FirebaseImageUpload() {
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState([]);

  const handleClick = () => {
    const status = [];

    files.forEach(file => {
      if (file !== null) {
        const imgRef = ref(storage, `files/${v4()}`);
        uploadBytes(imgRef, file).then(value => {
          getDownloadURL(value.ref).then(async (url) => {
			 await setDoc(doc(db, "images",v4()), {
				photoUrl:url,
        createdAt:Timestamp.now()
			});
            setUploadStatus(prevStatus => [
              ...prevStatus,
              { file: file.name, status: 'success', url }
            ]);
            setFiles([]);
          }).catch(error => {
            setUploadStatus(prevStatus => [
              ...prevStatus,
              { file: file.name, status: 'error', error }
            ]);
          });
        }).catch(error => {
          setUploadStatus(prevStatus => [
            ...prevStatus,
            { file: file.name, status: 'error', error }
          ]);
        });
      }
    });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  return (
    <div className="App">
      <input type="file"  multiple onChange={handleFileChange} />
      <button onClick={handleClick}>Upload</button>
      <br />
      <div>
        {uploadStatus.map((status, index) => (
          <div key={index}>
            <p>File: {status.file}</p>
            <p>Status: {status.status}</p>
            {status.status === 'success' && <a href={status.url}>View Image</a>}
            {status.status === 'error' && <p>Error: {status.error.message}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FirebaseImageUpload;
