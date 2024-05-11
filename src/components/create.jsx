import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./selnotes.module.css";

import { FaPlus } from "react-icons/fa";
import AppContext from "../context/context";

function CreateNote() {
  const { modal, SetModal, setNoteHeadings } = useContext(AppContext);
  function randomLetters(s) {
    if (!s) {
      return "NA";
    }

    const words = s.split(" ");

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    } else {
      const firstIndex = Math.floor(Math.random() * words.length);
      const secondIndex =
        (firstIndex + 1 + Math.floor(Math.random() * (words.length - 1))) %
        words.length;

      const firstLetter = words[firstIndex][0] || "";
      const secondLetter = words[secondIndex][0] || "";

      return firstLetter.toUpperCase() + secondLetter.toUpperCase();
    }
  }
  const [grpName, setGrpName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState(false);
  const tempColor = useRef();

  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  

  const addNote = () => {
    const letters = randomLetters(grpName);
    if (grpName && selectedColor) {
      setNoteHeadings((prevNoteHeadings) => [
        ...prevNoteHeadings,
        {
          name: grpName,
          color: selectedColor,
          letters: letters,
          notes: [],
        },
      ]);
      SetModal();
      setGrpName("");
      setSelectedColor("");
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (modal) {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setGrpName("");
          setSelectedColor("");
          setError(false);
          SetModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [modal, SetModal]);

  const handleClickOutside = (event) => {
    if (event.target.classList.contains(styles.modal)) {
      SetModal();
      setGrpName("");
      setSelectedColor("");
      setError(false);
    }
  };

  return (
    <>
      <button className={styles.button} onClick={SetModal}>
        {" "}
        <FaPlus size="1em" />
      </button>
      {modal && (
        <div className={styles.modal} onClick={handleClickOutside}>
          <div className={styles.modalContent}>
            <h7>Create New group</h7>
            <div>
              <label>Group Name</label>
              <input
                type="text"
                onChange={(e) => setGrpName(e.target.value)}
                placeholder="Enter your group name"
              />
            </div>
            <div className={styles.colorComp}>
              <label>Choose color</label>
              <div>
                {colors.map((color) => {
                  const colorId = color.replace("#", "");
                  return (
                    <div
                      id={`${colorId}`}
                      key={colorId}
                      onClick={() => {
                        setSelectedColor(color);
                        tempColor.current = color;
                      }}
                      className={`${styles.color}  ${
                        selectedColor && styles.selectedColor
                      } ${tempColor.current === color && styles.selected}`}
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div>
            <button onClick={addNote}>Create</button></div>
            {error && (
              <label id="error" className="hidden" style={{ marginTop: "-.5rem" }}>
                Please fill out the required fields
              </label>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CreateNote;