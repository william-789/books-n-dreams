import {Link} from "react-router-dom";
import ThirdButton from "../buttons/ThirdButton/ThirdButton";
import React from "react";
import { baseImageLink } from "../../util/axiosBooks";
import {useUser} from "../../context/userContext";

export default function UserBanner ({ main, nome, capa, foto }) {
  const { logout } = useUser()

  const bgImage = {
    backgroundImage: `url(${baseImageLink+capa})`,
  };

  const profileImage = {
    backgroundImage: `url(${baseImageLink+(foto || '/users/userIcon.png')})`,
  };

  return (
    <div className={"userInfo"}>
      <div className={"userBanner"} style={bgImage}></div>
      <div className={"wrapper-Info"}>
        <div className={"imageText"}>
          <div className={"userImage"} style={profileImage}></div>
          <div className={"userText"}>
            <h1>{nome}</h1>
            {main && (<div className={"button"}>
              <div className={"group"}>
                <Link to={"/edit-personal"}>
                  <ThirdButton text={"Editar Perfil"}/>
                </Link>
                <div onClick={()=>logout()}>
                  <ThirdButton text={"Logout"}/>
                </div>
              </div>
            </div>)}


          </div>
        </div>
      </div>
    </div>
  )
}
