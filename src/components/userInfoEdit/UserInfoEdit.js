import {Link, NavLink} from "react-router-dom";

export default function UserInfoEdit(props) {
    return <div className={"UserInfoEdit"}>
        <NavLink to={"/edit-personal"}>
            <p>Dados Pessoais</p>
        </NavLink>
        <hr className={"separator"}/>
        <NavLink to={"/edit-payment"}>
            <p>Pagamento</p>
        </NavLink>
        <hr className={"separator"}/>
    </div>
}