export default function ItemCard({ image, title, description, onClick }) {
  return (
    /* 🚀 Added the onClick trigger here */
    <div className="item-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={image} alt={title} />
      <h3 className="textgrey">{title}</h3>
      <p className="textgrey">{description}</p>
    </div>
  );
}