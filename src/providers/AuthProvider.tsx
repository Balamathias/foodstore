import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { getSession, getUser } from '../lib/supabase/auth'
import { supabase } from '../lib/supabase'

type AuthContextType = {
    session: Session | null,
    isPending: boolean,
    user: User | null
}

const AuthContext = React.createContext<AuthContextType>({
    session: null,
    isPending: false,
    user: null
})

const AuthProvider = ({ children }: PropsWithChildren ) => {

    const [session, setSession] = React.useState<Session | null>(null)
    const [user, setUser] = React.useState<User | null>(null)
    const [pending, setPending] = React.useState<boolean>(false)

    useEffect(() => {
        setPending(true)
        const fetchSession = async () => {
            const { session } = await getSession()
            setSession(session)
          }

        const fetchUser = async () => {
            const { user } = await getUser()
            setUser(user)
        }

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        fetchSession()
        fetchUser()
        setPending(false)
    }, [])

  return (
    <AuthContext.Provider value={{session, isPending: pending, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider