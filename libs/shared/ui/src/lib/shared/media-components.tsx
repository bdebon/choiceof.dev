import {useRef, useState} from "react";
import {addMedia} from "../../../../api/media";

export interface MediaProps {
  contentUrl: {
    image: string
  }
}

export default function MediaComponents(props: MediaProps) {
  const [imgSrc, setImgSrc] = useState<string|null>(null)
  const handlePhoto = (e: { target: HTMLInputElement; }) => {
    const target = e.target;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result as string;
      setImgSrc(result)
      addMedia(result)
        .then((response) => {
          props.contentUrl.image = response.data["@id"]
        })
    }
    if  (target.files) {
      fileReader.readAsDataURL(target.files[0]);
    }
  }

  return (
    <>
      <input onChange={handlePhoto} type="file" placeholder={'photo'}/>
      {imgSrc && <img src={imgSrc} alt={'alt image'}/>}
    </>
  )
}
