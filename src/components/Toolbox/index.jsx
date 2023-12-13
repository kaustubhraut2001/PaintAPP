import React from "react";
import styles from "./index.module.css";

import {COLORS} from "../../constants"
const Toolbox = () => {
  const updateburshsize = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className={styles.toolboxconiainder}>
      <div className={styles.toolitems}>
        <h5 className={styles.toolText}>Stroke Color</h5>

      <div className={styles.itemcontainer}>
        <div  className = {styles.colorBox} style={{backgroundColor : COLORS.BLACK}}/>
		<div  className = {styles.colorBox} style={{backgroundColor : COLORS.RED}}/>
		<div  className = {styles.colorBox} style={{backgroundColor : COLORS.BLUE}}/>
		<div  className = {styles.colorBox} style={{backgroundColor : COLORS.ORANGE}}/>
		<div  className = {styles.colorBox} style={{backgroundColor : COLORS.YELLOW}}/>
		<div  className = {styles.colorBox} style={{backgroundColor : COLORS.WHITE}}/>
		</div>

      </div>
      <div className={styles.toolItems}>
        <h5 className={styles.toolText}>Brush Size </h5>
        <div className={styles.itemcontainer}>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            onChange={updateburshsize}
            name=""
            id=""
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
