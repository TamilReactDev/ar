import React, { useState } from 'react';
import 'aframe';
import aframe from 'aframe';
import { Entity, Scene } from 'aframe-react';
import '@ar-js-org/ar.js/aframe/build/aframe-ar.js';
// import registerClickDrag from 'aframe-click-drag-component';
// registerClickDrag(aframe);


const ARScene = () => {
  const initialImages = [
    'https://images.pexels.com/photos/725458/pexels-photo-725458.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/19734107/pexels-photo-19734107/free-photo-of-traditional-wedding-indian-couple.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/17261594/pexels-photo-17261594/free-photo-of-smiling-bride-and-groom-in-traditional-costumes.jpeg?auto=compress&cs=tinysrgb&w=600',
  ];

  const [images, setImages] = useState(initialImages);


  const handleLoadMore = () => {
    const newImages = [
      'https://images.pexels.com/photos/7685590/pexels-photo-7685590.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1587042/pexels-photo-1587042.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3872624/pexels-photo-3872624.jpeg?auto=compress&cs=tinysrgb&w=600'
    ];
    setImages([...newImages]);
  };


  
  const createImageEntities = () => {
    return images.map((src, index) => (
      <Entity
        key={index}
        geometry={{ primitive: 'plane' }}
        material={{ src }}
        position={{ x: (index - Math.floor(images.length / 2)) * 2, y: 0, z: -3 }}
        scale={{ x: 1.5, y: 1.5, z: 1.5 }}
      />
    ));
  };

  return (
    <>
      <Scene arjs="sourceType: webcam; debugUIEnabled: false;">
        <Entity camera  look-controls="enabled: true; magicWindowTrackingEnabled: true;" />
        {createImageEntities()}
      </Scene>
      <button onClick={handleLoadMore} style={{position:'absolute',bottom:20,left:'50%'}}>Load more image</button>
    </>
  );
};

export default ARScene;
