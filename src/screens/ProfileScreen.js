import React from "react";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "../components/profileComponents/Orders";

const ProfileScreen=()=>{
window.scrollTo(0,0);

return(
    <>
        <Header/>
        <div>
            <div>
                <img src="" alt="userprofileimage"/>
            </div>
            <div>
                <h5>
                    <strong>Admin</strong>
                </h5>
                <span>
                    <>19 deptiembre 2023</>
                </span>
            </div>
            <div id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <button 
                id="v-pills-home-tab"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true">
                    Config perfil
                </button>
                <button 
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="true">
                    Lista de pedidos
                </button>
            </div>
        </div>
        <div>
            
        </div>
    </>
)
}
export default ProfileScreen;;