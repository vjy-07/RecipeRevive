import React, { useEffect } from "react";
import "../styles/modal.scss";

const Modal = ({ recipe, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{recipe.label}</h2>

        <div className="modal-body">
          <img src={recipe.image} alt={recipe.label} />

          <h3>Ingredients:</h3>

          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Modal;
