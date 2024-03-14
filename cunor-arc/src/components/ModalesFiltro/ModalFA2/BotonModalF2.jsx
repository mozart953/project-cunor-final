import Button from 'react-bootstrap/Button';

function MyButtonF2({ onOpenModal }) {
  return (
    <Button variant="primary" onClick={onOpenModal}>
      <strong><i className="bi bi-bookmarks"></i> Listado de autores</strong>
    </Button>
  );
}

export default MyButtonF2;