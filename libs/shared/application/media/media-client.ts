import {useClient} from "libs/shared/application/api/client";
import {ApiReadImage} from "libs/shared/application/media/media";
import {apiUrl} from "libs/shared/application/api/api.url";

export function addMedia(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return useClient().post<ApiReadImage>(
    '/api/media_objects',
    formData,
    {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    }
  )
}

export const mediaUrl = (url: string): string => {
  return apiUrl + url;
}
