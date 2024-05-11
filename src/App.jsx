import React, { useEffect, useState } from "react";
import SelectNotes from "./components/selnotes";
import NotesSection from "./components/notes";
import "./App.css";
import Context from "./context/context";

function App() {
  const [modal, setModal] = useState(false);
  const SetModal = () => setModal((prev) => !prev);
  const [noteHeadings, setNoteHeadings] = useState(
    localStorage.getItem("notes")
      ? JSON.parse(localStorage.getItem("notes"))
      : ""
  );
  const [hide, setHide] = useState(false);
  const [currentGroup, setCurrentGroup] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth > 768) {
        setHide(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setCurrentGroup(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        modal,
        SetModal,
        noteHeadings,
        setNoteHeadings,
        hide,
        setHide,
        isMobile,
        setIsMobile,
        currentGroup,
        setCurrentGroup,
      }}
    >
      <div className="App">
        <SelectNotes />
        <NotesSection />
      </div>
    </Context.Provider>
  );
}

export default App;