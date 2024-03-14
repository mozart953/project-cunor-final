import Button from 'react-bootstrap/Button';

function MyButtonT({ onOpenModal }) {
  return (
    <Button variant="primary" onClick={onOpenModal}>
      <strong><i className="bi bi-bookmarks"></i> Listado de titulos</strong>
    </Button>
  );
}

export default MyButtonT;