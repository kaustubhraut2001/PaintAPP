import React from "react";
import styles from "./index.module.css";
import {changeBrushSize , changecolor} from "../../Redux/Slice/Toolboxslice"
import cx from "classnames";

import {COLORS, MENU_ITEMS} from "../../constants"
import { useSelector , useDispatch } from "react-redux";
const Toolbox = () => {
  const dispatch = useDispatch();
  const activemenuitem = useSelector((state)=>state.menu.activeMenuItem)
  const showstroketooloption = activemenuitem === MENU_ITEMS.PENCIL ;
  const showbrushtooloption = activemenuitem === MENU_ITEMS.PENCIL ||  activemenuitem === MENU_ITEMS.ERASER ;

  const activemenuitemm = useSelector((state)=>state.menu.activeMenuItem);
	const {color , size } = useSelector((state)=>state.toolkit[activemenuitemm]);
  const updateburshsize = (e) => {
    console.log(e.target.value);
    dispatch(changeBrushSize({item : activemenuitem , size : e.target.value}));

  };

  const updatecolor = (newcolor) => {
    dispatch(changecolor({item : activemenuitem , color : newcolor}));
  }



  return (
    <div className={styles.toolboxconiainder}>


      {showstroketooloption && <div className={styles.toolitems}>
        <h5 className={styles.toolText}>Stroke Color</h5>

      <div className={styles.itemcontainer}>
        <div  className = {cx(styles.colorBox , {[ styles.active] : color === COLORS.BLACK})}style={{backgroundColor : COLORS.BLACK}} onClick={()=>updatecolor(COLORS.BLACK)}/>


		<div  className = {cx(styles.colorBox , {[ styles.active] : color === COLORS.RED})} style={{backgroundColor : COLORS.RED}} onClick={()=>updatecolor(COLORS.RED)}/>


		<div  className = {cx(styles.colorBox , {[ styles.active] : color === COLORS.BLUE})}
    style={{backgroundColor : COLORS.BLUE}} onClick={()=>updatecolor(COLORS.BLUE)}/>


		<div  className = {cx(styles.colorBox , {[ styles.active] : color === COLORS.ORANGE})}
    style={{backgroundColor : COLORS.ORANGE}} onClick={()=>updatecolor(COLORS.ORANGE)}/>


		<div  className = {cx(styles.colorBox , {[ styles.active] : color === COLORS.YELLOW})}
    style={{backgroundColor : COLORS.YELLOW}} onClick={()=>updatecolor(COLORS.YELLOW)}/>

		<div  className = {cx(styles.colorBox , {[ styles.active] : color === COLORS.WHITE})}
    style={{backgroundColor : COLORS.WHITE}} onClick={()=>updatecolor(COLORS.WHITE)}/>
		</div>

      </div>}

{showbrushtooloption && <div className={styles.toolItems}>
        <h5 className={styles.toolText}>{activemenuitem} Size  </h5>
        <div className={styles.itemcontainer}>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            onChange={updateburshsize}

            value={size}
          />
        </div>
      </div>}

    </div>
  );
};

export default Toolbox;
