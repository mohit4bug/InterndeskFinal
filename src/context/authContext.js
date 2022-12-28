import axios from "axios"
import { createContext, useEffect, useState } from "react"
export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {

        const url = "http://192.168.43.43:8080/user/login"

        try {
            const response = await axios.post(url, inputs)
            setCurrentUser(response.data.data)
            return [response.data.message, response.data.status, response.data.data.auth]

        }
        catch (err) {
            console.log(err)
            return [err.response.data.error, err.response.data.status]
        }
    };
    const logout = () => {
        setCurrentUser(null)
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider >
    )
}

