import Button from 'react-bootstrap/Button';

function MyButton({ onOpenModal }) {
  return (
    <Button variant="primary" onClick={onOpenModal}>
      <i className="bi bi-bookmarks"></i> Referencia
    </Button>
  );
}

export default MyButton;
