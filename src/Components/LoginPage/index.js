import React from "react";
import ButtonLogIn from "./ButtonLogIn/index";
import LogoDevs from "./LogoDevs/index";
import Description from "./Description/index";
import Copyright from "./Copyright/index";


const LoginPage = () => {
    return (
        <div>
            <LogoDevs />
            <Description />
            <ButtonLogIn />
            <Copyright />
        </div>
    )
}

export default LoginPage;