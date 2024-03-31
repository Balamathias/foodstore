import { useMutation } from "@tanstack/react-query"
import { signInWithEmail, signUpWithEmail } from "./supabase/auth"
import { useRouter } from "expo-router"

export const useSignUp = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: ({email, password}: {email: string, password: string}) => signUpWithEmail(email, password),
        mutationKey: ['sign-up'],
        onSuccess: ({data: {user}}) => {
            if (user?.role === 'admin') {
                router.push('/(admin)/menu')
            } else {
                router.push('/(user)/menu')
            }
        }
    })
}

export const useSignIn = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: ({email, password}: {email: string, password: string}) => signInWithEmail(email, password),
        mutationKey: ['sign-in'],
        onSuccess: ({data: {user}}) => {
            // if (user.role === 'admin') {
            //     router.push('/(admin)/menu')
            // } else {
            //     router.push('/(user)/menu')
            // }
        }
    })
}
