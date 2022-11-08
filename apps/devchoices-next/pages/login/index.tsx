import UserToken, {UserConnection} from "../../../../libs/shared/user/user";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router'

export default function Page() {
  const router = useRouter()
  const userConnection: UserConnection = {
    email: '',
    password: ''
  }

  const [error, setError] = useState<boolean>(false);

  const redirectToAdminPage = () => {
    if (UserToken.isConnected()) router.push("admin/home")
  }

  const handleSubmit = (e) => {
    UserToken.connection(userConnection)
      .then(() => {
        redirectToAdminPage()
      })
      .catch((e) => {
        setError(true);
      })
    e.preventDefault()
  }

  useEffect(() => redirectToAdminPage())

  return (
    <div className={'md:h-screen bg-white relative flex flex-col justify-center items-center'}>
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                   type="text" placeholder="email"
                   onChange={(e) => userConnection.email = e.target.value}
                   required
            />
          </div>
          <div className="mb-6">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
                   type="password" placeholder="******************"
                   onChange={(e) => userConnection.password = e.target.value}
                   required
            />
          </div>
          <div className="flex items-center justify-between">
            <input value="Sign In" className="cursor-pointer bg-blue-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded" type="submit" />
          </div>
          <div>
            {error &&
              <span>Problème de connection</span>
            }
          </div>
        </div>
      </form>

    </div>
  )
}
