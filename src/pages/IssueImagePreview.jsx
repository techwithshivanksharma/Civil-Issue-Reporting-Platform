import React,{useState, useEffect} from 'react'
import { use } from 'react';


const IssueImagePreview = ({file}) => {

    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(()=>{
        if(!file){
            setPreviewUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        //cleanup : Jab component unmount hoga ya file chnage hogi
        return () => URL.revokeObjectURL(url);

    },[file])

    if(!previewUrl) return null;

  return (
    <img
        src={previewUrl}
        alt='Issue'
        className='w-full h-40 object-cover rounded-lg border'
    />
  );
}

export default IssueImagePreview
