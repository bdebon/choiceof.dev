import {useRouter} from 'next/router'
import {useUserToken} from "libs/shared/application/user/user";
import {useEffect} from "react";
import QuestionCollectionComponent from "libs/shared/ui/src/lib/admin/question-collection-component";

export default function Page() {
  const userToken = useUserToken()
  const router = useRouter()

  useEffect(() => {
    if (!userToken.isConnected()) {
        router.push("/")
    }
  });

  return (
    <div className={'p-5'}>
      <h1 className={'font-bold '}>Administration des questions</h1>
      <QuestionCollectionComponent></QuestionCollectionComponent>
    </div>
  )
}

