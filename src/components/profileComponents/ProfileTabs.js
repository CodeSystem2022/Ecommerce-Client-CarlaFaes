import React from "react";

const ProfileTabs=()=>{
    return(
        <>
        <form>
            <div>
                <div>
                    <label> Username</label>
                    <input type="text" required/>
                </div>
            </div>
            <div>
                <div>
                    <label>Email addres</label>
                    <input type="email"/>
                </div>
            </div>
            <div>
                <div>
                    <label for="account-pass">Contraseña nueva</label>
                    <input type="password"/>
                </div>
            </div>
            <div>
                <div>
                    <label for="account-confirm-pass"> Confirm Password</label>
                    <input type="password"/>
                </div>
            </div>
            <button type="submit">Actualizar perfil</button>
        </form>
        </>
    )
}

export default ProfileTabs;