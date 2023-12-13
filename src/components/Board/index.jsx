import { MENU_ITEMS } from "@/constants";
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionitemcliick } from "../../Redux/Slice/Menuslice";

function Board() {
  const canvasref = useRef(null);
  const shouddraw = useRef(false);
  const history = useRef([]);
  const histrypointer = useRef(0);
  const dispatch = useDispatch();

  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);

  const { color, size } = useSelector((state) => state.toolkit[activeMenuItem]);


  useEffect(() => {
    if (!canvasref.current) {
      return;
    }
    const canvas = canvasref.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);



  useEffect(() => {
    if (!canvasref.current) {
      return;
    }
    const canvas = canvasref.current;
    const context = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "image.jpg";
      anchor.click();

      console.log(URL);
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
    //   if (histrypointer.current > 0) {
    //     histrypointer.current = histrypointer.current - 1;
    //   }

    //   const imagedata = history.current[histrypointer.current];
    //   context.putImageData(imagedata, 0, 0);
	if (histrypointer.current > 0 && history.current.length > 0) {
		histrypointer.current = histrypointer.current - 1;
		const imagedata = history.current[histrypointer.current];
		context.putImageData(imagedata, 0, 0);
	}
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
    //   if (histrypointer.current < history.current.length - 1) {
    //     histrypointer.current = histrypointer.current + 1;
    //   }

    //   const imagedata = history.current[histrypointer.current];
    //   context.putImageData(imagedata, 0, 0);
	if (
		histrypointer.current < history.current.length - 1 &&
		history.current.length > 0
	  ) {
		histrypointer.current = histrypointer.current + 1;
		const imagedata = history.current[histrypointer.current];
		context.putImageData(imagedata, 0, 0);
	  }
    }
    dispatch(actionitemcliick(null));
    console.log(actionMenuItem);
  }, [actionMenuItem, dispatch]);



  useLayoutEffect(() => {
    if (!canvasref.current) {
      return;
    }
    const canvas = canvasref.current;
    const context = canvas.getContext("2d");

    const configchange = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    const mousedownfn = (e) => {
      shouddraw.current = true;
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    };
    const mouseupfn = (e) => {
      shouddraw.current = false;

      const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
      history.current.push(imagedata);
      histrypointer.current = history.current.length - 1;
    };
    const mousemovefn = (e) => {
      if (!shouddraw.current) {
        return;
      }
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
    };

    canvas.addEventListener("mousedown", mousedownfn);
    canvas.addEventListener("mouseup", mouseupfn);
    canvas.addEventListener("mousemove", mousemovefn);
    configchange();

    return () => {
      canvas.removeEventListener("mousedown", mousedownfn);
      canvas.removeEventListener("mouseup", mouseupfn);
      canvas.removeEventListener("mousemove", mousemovefn);
    };
  }, [color, size]);
  return (
    <div>
      <canvas ref={canvasref}></canvas>
      {console.log(color, size)}
    </div>
  );
}

export default Board;
