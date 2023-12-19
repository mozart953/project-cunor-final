import { useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function MyVerticallyCenteredModal(props) {
    const textRef = useRef(null);

    const copyToClipboard = (e) => {
        const text = textRef.current.innerText;
        navigator.clipboard.writeText(text);
    };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.formato}</h4>
        <div className="alert alert-secondary d-flex justify-content-center align-items-center" role="alert">
            <p className="d-flex justify-content-center align-items-center me-3" ref={textRef}>{props.general}</p>
            <button  type="button" className="btn btn-primary" onClick={copyToClipboard}><i className="bi bi-copy"></i></button>
        </div>
        <div className="alert alert-primary" role="alert">
            <p>{props.mensaje}</p>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
