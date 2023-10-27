import React, { useEffect } from "react";
import moment from "moment";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs.js";
import Orders from "../components/profileComponents/Orders";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../Redux/Actions/UserAction";

const ProfileScreen=()=>{
window.scrollTo(0,0);

const dispatch=useDispatch()
const userLogin= useSelector((state)=> state.userLogin)
const {userInfo}=userLogin
console.log(userInfo,'userInfo')

useEffect(()=>{
    dispatch(getUserDetails("profile"))
},[dispatch])

return(
    <>
        <Header/>
        <ProfileTabs/>
        <div>
            <div>
                <img src="" alt="userprofileimage"/>
            </div>
            <div>
                <h5>
                    <strong>{userInfo.name}</strong>
                </h5>
                <span>
                    <>Se unió en {moment(userInfo.createdAt).format('LL')}</>
                </span>
            </div>
            <div>

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
export default ProfileScreen;