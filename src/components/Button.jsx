export default function Button({ text, variant, onClick }) {
  return (
    <button className={`btn ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
}
