import Modal from "../shared/Modal/Modal";

const onCloseEl = ({ onClose }) => {
  return (
    <div className={"onCloseContainer"}>
      <img alt={"error close button"} src={"/assets/Error.svg"} onClick={onClose}/>
    </div>
  )
}

function ErrorModal ({message, onClose}) {
  return (
    <Modal onCloseEl={onCloseEl} onClose={onClose} id={"error"}>
      <div className={"error-content"}>
        <p>{message}</p>
        <div className={"button-container"}>
          <button onClick={onClose}>Fechar</button>
        </div>
      </div>
    </Modal>
  )
}

export default ErrorModal;
