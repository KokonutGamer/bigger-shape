import InputField from "./components/InputField";
import ErrorMessage from "./components/ErrorMessage";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { supabase } from "./AuthContext";

/**
 * Handles the create account page.
 * This function is responsible for rendering the create account page.
 * The page includes input fields for the user's name, email, and password

 * The user's information is validated before attempting to create an account.
 * If the information is invalid, an error message is displayed.
 * If the information is valid, the user is redirected to the dashboard.
 * 
 * @returns The rendered create account page.
 */
function CreateAccountPage() {

    const [isValidInput, setIsValidInput] = useState({
        userName: true,
        password: true,
        confirmPassword: true,
        email: true,
    });
    const [isValidLength, setIsValidLength] = useState({
        userName: true,
        password: true,
    });
    useEffect(() => {
        // for debugging
        console.log(isValidInput);
    }, [isValidInput]);

    // used to store the user's information
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    // every time password is updated, checks if confirmPassword is equal to password
    useEffect(() => {
        const isMatch = password === confirmPassword;
        setIsValidInput(prev => ({
            ...prev,
            confirmPassword: isMatch
        }));
    }, [password, confirmPassword]);


    /**
     * Handles the create account page.
     * This function is responsible for validating the user's information and creating an account.
     * If the user's information is invalid, an error message is displayed.
     * If the user's information is valid, the user is redirected to the dashboard.
     */
    async function handleCreateAccount() {
        if (userName === "" || password === "" || confirmPassword === "" || email === "") {
            console.log("Please fill in all fields.");
            alert("Please fill in all fields.");
            return;
        }
        if (!Object.values(isValidInput).every(Boolean) || !Object.values(isValidLength).every(Boolean)) {
            console.log("Validation failed.");
            return;
        }


        const signupPayload = {
            password,
            options: {
                data: {
                    full_name: userName, // Supabase uses full_name as the default display name
                }
            }
        };

        if (email) {
            signupPayload.email = email;
        }


        const { data, error } = await supabase.auth.signUp(signupPayload);
        if (error) {
            console.error("Signup failed:", error.message);
            return;
        }

        console.log("Signup successful:", data);
        window.location.href = "/dashboard";
    }


    return (
        <>
            <style>
                {/* to fix issue dealing with vite */}
                {`
                    #root{
                        padding: 0;
                        margin: 0;
                    }
                    body {
                        background-image: linear-gradient(to top left, #bfdbfe, #3b82f6);
                        }    
                        `}
            </style>
            <div className="flex items-center justify-center flex-col w-[100vw] h-[10vh]">
                <NavBar />
            </div>
            <div className="flex flex-col items-center justify-center h-[90vh] w-[100vw]">
                <h1 className="text-white text-3xl font-bold mt-[7vh] mb-[5vh]">Create Account</h1>
                <div className="flex flex-col items-center justify-center w-[40vw] h-[60vh] bg-gradient-to-br from-blue-200 to-blue-500
                rounded-lg
                text-black
                shadow-md">
                    <InputField type="text" id="userName" label="User Name:" requiredField={true} regex={/^\w*$/} setIsValidInput={setIsValidInput} sizeRange={{ min: 3, max: 20 }} setIsValidLength={setIsValidLength} setCurrentValue={setUserName} />
                    <ErrorMessage message="Only Numbers and Letters" hidden={isValidInput.userName} />
                    <ErrorMessage message="Must be between 3 and 20 characters" hidden={isValidLength.userName} />


                    <InputField type="password" id="password" label="New Password:" requiredField={true} regex={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/} setIsValidInput={setIsValidInput} sizeRange={{ min: 8, max: 20 }} setIsValidLength={setIsValidLength} setCurrentValue={setPassword} />
                    <ErrorMessage message="Must include uppercase, lowercase, number, and special character." hidden={isValidInput.password} />
                    <ErrorMessage message="Must be between 8 and 20 characters" hidden={isValidLength.password} />

                    <InputField type="password" id="passwordConfirm" label="Confirm Password:" requiredField={true} setIsValidInput={setIsValidInput} setCurrentValue={setConfirmPassword} />
                    <ErrorMessage message="Must match password" hidden={isValidInput.confirmPassword} />
                    <ErrorMessage message="Placeholder" hidden={true} /> {/* placeholder for consistency */}

                    <InputField type="text" id="email" label="Email Address:" requiredField={false} regex={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/} setIsValidInput={setIsValidInput} setCurrentValue={setEmail} />
                    <ErrorMessage message="Must be a valid email" hidden={isValidInput.email} />
                    <ErrorMessage message="Placeholder" hidden={true} />{/* placeholder for consistency */}

                    <p className="text-red-600 text-sm text-center mt-[2vh]">* required field</p>

                </div>
                <div className="flex items-center justify-between w-[40vw] mt-[2vh]">
                    <a href="/login" className="text-blue-500">Already have an account?</a>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={handleCreateAccount}>Create Account</button>
                </div>
            </div>
        </>
    );
}

export default CreateAccountPage;