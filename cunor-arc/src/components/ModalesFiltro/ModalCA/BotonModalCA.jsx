import Button from 'react-bootstrap/Button';

function MyButtonCA({ onOpenModal }) {
  return (
    <Button variant="primary" onClick={onOpenModal}>
      <strong><i className="bi bi-bookmarks"></i> Listado de carreras</strong>
    </Button>
  );
}

export default MyButtonCA;