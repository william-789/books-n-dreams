import "./whereToBuy.scss"

export default function WhereToBuy (props) {
    return <div className={"WhereToBuy"}>
<div className={"image"}>
    <img>{props.capa}</img>
</div>
        <div className={"info"}>
<h3>{props.nome}</h3>
            <p>{props.localidade + props.distrito}</p>
<h4>{props.preco}</h4>
        </div>
    </div>
}