import Button from 'react-bootstrap/Button';

function MyButtonF({ onOpenModal }) {
  return (
    <Button variant="primary" onClick={onOpenModal}>
      <strong><i className="bi bi-bookmarks"></i> Listado de autores</strong>
    </Button>
  );
}

export default MyButtonF;