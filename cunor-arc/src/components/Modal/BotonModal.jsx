import Button from 'react-bootstrap/Button';

function MyButton({ onOpenModal }) {
  return (
    <Button variant="primary" onClick={onOpenModal}>
      <strong><i className="bi bi-bookmarks"></i> Referencia</strong>
    </Button>
  );
}

export default MyButton;
