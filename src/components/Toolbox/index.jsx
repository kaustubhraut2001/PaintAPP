import React from "react";
import styles from "./index.module.css";
import {
  changeBrushSize,
  changecolor,
  changeBackgroundColor,
} from "../../Redux/Slice/Toolboxslice";
import cx from "classnames";
import { socket } from "../../Socket";
import { COLORS, MENU_ITEMS } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
const Toolbox = () => {
  const dispatch = useDispatch();
  const activemenuitem = useSelector((state) => state.menu.activeMenuItem);
  const showstroketooloption = activemenuitem === MENU_ITEMS.PENCIL;
  const showbrushtooloption =
    activemenuitem === MENU_ITEMS.PENCIL ||
    activemenuitem === MENU_ITEMS.ERASER;

  const activemenuitemm = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector(
    (state) => state.toolkit[activemenuitemm]
  );
  const backgroundColor = useSelector(
    (state) => state.toolkit[MENU_ITEMS.BACKGROUND_COLOR]?.color
  );

  const updateburshsize = (e) => {
    console.log(e.target.value);
    dispatch(changeBrushSize({ item: activemenuitem, size: e.target.value }));
    socket.emit("changeconfig", { color, size: e.target.value });
  };

  const updatecolor = (newcolor) => {
    dispatch(changecolor({ item: activemenuitem, color: newcolor }));
    socket.emit("changeconfig", { color: newcolor, size });
  };

  const UpdateBackgroundColor = (e) => {
    const newBackgroundColor = e.target.value;
    dispatch(changeBackgroundColor({ color: newBackgroundColor }));
    socket.emit("changebackgroundcolor", { color: newBackgroundColor });
  };

  return (
    <div className={styles.toolboxconiainder}>
      {showstroketooloption && (
        <div className={styles.toolitems}>
          <h5 className={styles.toolText}>Stroke Color</h5>

          <div className={styles.itemcontainer}>
            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.BLACK,
              })}
              style={{ backgroundColor: COLORS.BLACK }}
              onClick={() => updatecolor(COLORS.BLACK)}
            />

            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.RED,
              })}
              style={{ backgroundColor: COLORS.RED }}
              onClick={() => updatecolor(COLORS.RED)}
            />

            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.BLUE,
              })}
              style={{ backgroundColor: COLORS.BLUE }}
              onClick={() => updatecolor(COLORS.BLUE)}
            />

            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.ORANGE,
              })}
              style={{ backgroundColor: COLORS.ORANGE }}
              onClick={() => updatecolor(COLORS.ORANGE)}
            />

            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.YELLOW,
              })}
              style={{ backgroundColor: COLORS.YELLOW }}
              onClick={() => updatecolor(COLORS.YELLOW)}
            />

            <div
              className={cx(styles.colorBox, {
                [styles.active]: color === COLORS.WHITE,
              })}
              style={{ backgroundColor: COLORS.WHITE }}
              onClick={() => updatecolor(COLORS.WHITE)}
            />
          </div>
          <h5 style={{ marginTop: "10px" }} className={styles.toolText}>
            Custom Stroke Color
          </h5>
          <div
            className={cx(styles.colorBox, {
              [styles.active]: color === COLORS.CUSTOM,
            })}
            onClick={() => updatecolor(color)}
          >
            <input
              type="color"
              onChange={(e) => updatecolor(e.target.value)}
              value={color}
            />
          </div>
        </div>
      )}

      {showbrushtooloption && (
        <div className={styles.toolItems}>
          <h5 className={styles.toolText}>{activemenuitem} Size </h5>
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
          <div className={styles.toolText}>
            Change Page Color
            <input
              type="color"
              onChange={UpdateBackgroundColor}
              value={backgroundColor || "#ffffff"}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbox;
