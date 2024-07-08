import React, { useState } from 'react';
import {ref} from 'firebase/storage';
import {storage} from './firebase'

const Uploadfiles = () => {

  const [img,setImg] = useState('');
  

  function handleSubmit(){
        ref(storage,`files/`);
  }


  return (
    <div>
        <input type="file" name="" onChange={(e) =>setImg(e.target.files[0])} id="" />
        <button onClick={handleSubmit}>upload image</button>
    </div>
  )
}

export default Uploadfiles
