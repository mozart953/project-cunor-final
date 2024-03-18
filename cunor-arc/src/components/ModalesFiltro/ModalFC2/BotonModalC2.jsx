import Button from 'react-bootstrap/Button';

function MyButtonC2({ onOpenModal }) {
  return (
    <Button variant="primary" onClick={onOpenModal}>
      <strong><i className="bi bi-bookmarks"></i> Listado de categorías</strong>
    </Button>
  );
}

export default MyButtonC2;