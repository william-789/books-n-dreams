import Modal from "../shared/Modal/Modal";
import "./SuccessModal.scss"

const onCloseEl = ({ onClose }) => {
  return (
    <div className={"onCloseContainer"}>
      <img alt={"success close button"} src={"/assets/Success.svg"} onClick={onClose}/>
    </div>
  )
}

function SuccessModal ({message, onClose}) {
  return (
    <Modal onCloseEl={onCloseEl} onClose={onClose} id={"success"}>
      <div className={"success-content"}>
        <p>{message}</p>
        <div className={"button-container"}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </Modal>
  )
}

export default SuccessModal;
