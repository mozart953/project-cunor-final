import Button from 'react-bootstrap/Button';

function MyButtonF({ onOpenModal }) {
  return (
    <Button variant="primary" onClick={onOpenModal}>
      <strong><i className="bi bi-bookmarks"></i> Listar autores</strong>
    </Button>
  );
}

export default MyButtonF;