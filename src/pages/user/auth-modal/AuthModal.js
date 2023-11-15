import Modal from "../../../components/shared/Modal/Modal";
import LoginForm from "../../../components/forms/login/LoginForm";
import RegisterForm from "../../../components/forms/register/RegisterForm";
import "./AuthModal.scss"
import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const onCloseEl = ({onClose}) => {
  return (
    <div className={"onCloseContainer"}>
      <FontAwesomeIcon icon={faXmark} onClick={onClose}/>
    </div>
  )
}
function AuthModal ({onClose}) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: 'Login', content: <LoginForm /> },
    { label: 'Register', content: <RegisterForm /> },
  ];

  return (
    <Modal onCloseEl={onCloseEl} onClose={onClose} id={"auth"} >
      <div className={"auth-content"}>
        <ul className="tab-list">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={index === activeTab ? 'tab-option active' : 'tab-option'}
              onClick={() => setActiveTab(index)}
            >
              {tab.label.toUpperCase()}
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {tabs[activeTab].content}
        </div>
      </div>
    </Modal>
  )
}

export default AuthModal;
