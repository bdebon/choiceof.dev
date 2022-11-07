import UserToken, {UserConnection} from "../../../../libs/shared/user/user";
import {useState} from "react";
import {useRouter} from 'next/router'

export default function Page() {
  const router = useRouter()
  const userConnection: UserConnection = {
    email: '',
    password: ''
  }

  const [error, setError] = useState<boolean>(false);

  const handleSubmit = () => {
    UserToken.connection(userConnection)
      .then(() => {
        router.push("admin/home")
      })
      .catch((e) => {
        setError(true);
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => userConnection.email = e.target.value}
          type="text"
          placeholder={'Email'}/>
        <input
          onChange={(e) => userConnection.password = e.target.value}
          type="password"
          placeholder={'Password'}/>
        <input onClick={handleSubmit} type="button" value={'Envoyer'}/>
        {error &&
          <span>Problème de connection</span>
        }
      </form>
    </div>
  )
}
