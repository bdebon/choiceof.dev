import {useState} from "react";
import {addMedia, mediaUrl} from "libs/shared/application/media/media-client";
import {Image} from "libs/shared/application/media/media";

export interface MediaProps {
  image: Image,
  onChange?: (image: Image) => void
}

export default function MediaComponents(props: MediaProps) {

  const [imgSrc, setImgSrc] = useState<string|null>(
    props.image.contentUrl ? mediaUrl(props.image.contentUrl) : null
  )

  const handlePhoto = (e: { target: HTMLInputElement }) => {
    const target = e.target;
    const fileReader = new FileReader()

    if (!target.files) return

    addMedia(target.files[0])
      .then((response) => {
        if (props.onChange) {
          props.onChange({
            id: response.data.id,
          })
        }
      })

    fileReader.onload = () => {
      const result = fileReader.result as string;
      setImgSrc(result)
    }

    fileReader.readAsDataURL(target.files[0]);
  }

  return (
    <>
      <input onChange={handlePhoto} type="file" placeholder={'photo'}/>
      {imgSrc && <img src={imgSrc} alt={'alt image'}/>}
    </>
  )
}
