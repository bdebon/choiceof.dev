import {useUserToken} from "libs/shared/application/user/user";
import {FormEvent, useEffect, useState} from "react";
import {useRouter} from 'next/router'
import sharedStyle from "libs/shared/ui/src/lib/shared/shared.module.css";
import {UserConnection} from "libs/shared/application/user/user-client";

export default function Page() {
  const router = useRouter()
  const userToken = useUserToken()
  const userConnection: UserConnection = {
    email: '',
    password: ''
  }

  const [error, setError] = useState<boolean>(false);

  const redirectToAdminPage = () => {
    if (userToken.isConnected()) router.push("admin/home")
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    userToken.connection(userConnection)
      .then(() => {
        redirectToAdminPage()
      })
      .catch(() => {
        setError(true);
      })
    e.preventDefault()
  }

  useEffect(() => redirectToAdminPage())

  return (
    <div className={'md:h-screen bg-white relative flex flex-col justify-center items-center'}>
      <form onSubmit={handleSubmit}>
        <div className={sharedStyle.wrapper}>
          <div className="mb-4">
            <label className={sharedStyle.label} htmlFor="username">
              Email
            </label>
            <input className={sharedStyle.input}
                   type="text" placeholder="email"
                   onChange={(e) => userConnection.email = e.target.value}
                   required
            />
          </div>
          <div className="mb-6">
            <label className={sharedStyle.label} htmlFor="password">
              Password
            </label>
            <input className={sharedStyle.input}
                   type="password" placeholder="******************"
                   onChange={(e) => userConnection.password = e.target.value}
                   required
            />
          </div>
          <div>
            <input value="Sign In" className={sharedStyle.button} type="submit" />
          </div>
          <div>
            {error &&
              <span className={'text-red-500'}>Problème de connection</span>
            }
          </div>
        </div>
      </form>

    </div>
  )
}
