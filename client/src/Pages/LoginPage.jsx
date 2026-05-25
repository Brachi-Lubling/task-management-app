import LoginSide from "../Components/LoginSide"
import NextLoginSide from "../Components/NextLoginSide"
import 'primeflex/primeflex.css';

const LoginPage = () => {


    return(
        <>
        <div className="flex flex-column md:flex-row w-screen h-screen">
        <LoginSide/>
        <NextLoginSide/>
        </div>
        </>
    )
}

export default LoginPage