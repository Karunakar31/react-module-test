import React, { useContext } from "react";
import styles from "./selnotes.module.css";
import CreateNote from "./create";
import NoteHeading from "./heading";
import Context from "../context/context";

function SelNotes() {
  const { modal, SetModal, noteHeadings, hide } = useContext(Context);

  return (
    <div className={`${styles.container} ${hide && styles.hidden} `}>
      <h2>            </h2>
      <h2>Pocket Notes</h2>
      {noteHeadings.length > 0 && (
        <>
          {noteHeadings.map((noteHeading) => {
            return (
              <div key={noteHeading.name}>
                <NoteHeading noteHeading={noteHeading} />
              </div>
            );
          })}
        </>
      )}
      <CreateNote modal={modal} SetModal={SetModal} />
    </div>
  );
}

export default SelNotes;