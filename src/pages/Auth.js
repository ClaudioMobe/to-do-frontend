import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    AuthContainer,
    AuthForm,
    AuthInput,
    AuthButton,
    ToggleText,
    ErrorText,
  } from "../styles/AuthStyles";

const Auth = ({setToken}) => {
    const [ email, setEmail ] = useState("");
    const [ isRegistering, setIsRegistering ] = useState(false);
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");
    const [ error, setError ] = useState("");
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        switch(e.target.name){
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "passwordConfirmation":
                setPasswordConfirmation(e.target.value);
                break;
            default:
                break;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const endpoint = "http://localhost:3001/api" + (isRegistering ? "/auth/register" : "/auth/login");
            if (isRegistering && password !== passwordConfirmation){
                setError("Las contraseñas no coinciden");
                return;
            }
            if (email.trim() === "" || password.trim() === "") {
                setError("Usuario y contraseña son obligatorios");
                return;
              }
            const response = await axios.post(endpoint,{
                email,
                password
            });
            console.log(response.data);
            localStorage.setItem("token", response.data?.token);
            setToken(response.data?.token);
            navigate("/tasks");

        } catch (error) {
            setError(error.response?.data?.error);
            
        }
    }
    return (
        <AuthContainer>
            <AuthForm onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center" }}>{isRegistering ? "Registro" : "Login"}</h1>

            <AuthInput
                type="text"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleChange}
            />

            <AuthInput
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={handleChange}
            />

            {isRegistering && (
                <AuthInput
                type="password"
                name="passwordConfirmation"
                placeholder="Confirmar contraseña"
                value={passwordConfirmation}
                onChange={handleChange}
                />
            )}

            <AuthButton type="submit">{isRegistering ? "Registrarme" : "Iniciar sesión"}</AuthButton>

            {error && <ErrorText>{error}</ErrorText>}

            <ToggleText>
                {isRegistering
                ? "¿Ya tienes cuenta?"
                : "¿No tienes cuenta?"}{" "}
                <button type="button" onClick={() => {
                    setIsRegistering(!isRegistering);
                    setError("");
                }}>
                {isRegistering ? "Iniciar sesión" : "Registrarme"}
                </button>
            </ToggleText>
            </AuthForm>
        </AuthContainer>
    );
}
 
export default Auth;