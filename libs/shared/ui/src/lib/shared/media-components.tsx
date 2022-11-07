import {useRef} from "react";
import {addMedia} from "../../../../api/media";

export interface MediaProps {
  contentUrl: {
    image: string
  }
}

export default function MediaComponents(props: MediaProps) {
  const imgRef = useRef<HTMLImageElement>();
  const handlePhoto = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const result = fileReader.result as string;
      imgRef.current.src = result
      addMedia(result)
        .then((response) => {
          props.contentUrl.image = response.data["@id"]
        })
    }

    fileReader.readAsDataURL(target.files[0]);
  }

  return (
    <>
      <input onChange={handlePhoto} type="file" placeholder={'photo'}/>
      <img ref={imgRef}/>
    </>
  )
}
