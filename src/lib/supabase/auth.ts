import { supabase } from "../supabase"

export const signUpWithEmail = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signUp({email, password})
    if (error) {
        throw error
    }
    return {data}
}

export const signInWithEmail = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({email, password})
    if (error) {
        throw error
    }
    return {data}
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw error
    }
    return
}

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
        throw error
    }
    return {session: data.session}
}

export const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        throw error
    }
    return {user: data.user}
}
