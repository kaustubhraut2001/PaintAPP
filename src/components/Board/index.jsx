import { MENU_ITEMS } from "@/constants";
import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionitemcliick } from "../../Redux/Slice/Menuslice";

import { socket } from "../../Socket";

function Board() {
  const canvasref = useRef(null);
  const shouddraw = useRef(false);
  const history = useRef([]);
  const histrypointer = useRef(0);
  const dispatch = useDispatch();

  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);

  const { color, size } = useSelector((state) => state.toolkit[activeMenuItem]);

  // useEffect(() => {
  //   if (!canvasref.current) {
  //     return;
  //   }
  //   const canvas = canvasref.current;
  //   const context = canvas.getContext("2d");
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }, []);

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

  useEffect(() => {
    if (!canvasref.current) {
      return;
    }
    const canvas = canvasref.current;
    const context = canvas.getContext("2d");

    const configchange = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    };
    const handlechange = (config) => {
      configchange(config.color, config.size);
    };
    configchange(color, size);
    socket.on("changeconfig", handlechange);

    return () => {
      socket.off("changeconfig", handlechange);
    };
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasref.current) {
      return;
    }
    const canvas = canvasref.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    };
    const mousedownfn = (e) => {
      shouddraw.current = true;
      beginPath(
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY
      );
      socket.emit("beginpath", {
        x: e.clientX || e.touches[0].clientX,
        y: e.clientY || e.touches[0].clientY,
      });

      // socket.emit('beginpath' , {x:e.clientX , y:e.clientY});
    };
    const mouseupfn = (e) => {
      shouddraw.current = false;

      const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
      history.current.push(imagedata);
      histrypointer.current = history.current.length - 1;
    };

    const drawPath = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    };

    const mousemovefn = (e) => {
      if (!shouddraw.current) {
        return;
      }
      drawPath(
        e.clientX || e?.touches[0]?.clientX,
        e.clientY || e?.touches[0]?.clientY
      );
      socket.emit("drawpath", {
        x: e.clientX || e?.touches[0]?.clientX,
        y: e.clientY || e?.touches[0]?.clientY,
      });
    };

    canvas.addEventListener("mousedown", mousedownfn);
    canvas.addEventListener("mouseup", mouseupfn);
    canvas.addEventListener("mousemove", mousemovefn);

    canvas.addEventListener("touchstart", mousedownfn);
    canvas.addEventListener("touchmove", mousemovefn);
    canvas.addEventListener("touchend", mouseupfn);

    const handleBrginPath = (path) => {
      beginPath(path.x, path.y);
    };
    const handledrawPath = (path) => {
      drawPath(path.x, path.y);
    };

    socket.on("connect", () => {
      console.log("Client connected");
    });
    socket.on("beginpath", handleBrginPath);
    socket.on("drawpath", handledrawPath);
    // socket.on("connect", () => {
    //   console.log("connected"); // x8WIv7-mJelg7on_ALbx
    // });

    return () => {
      canvas.removeEventListener("mousedown", mousedownfn);
      canvas.removeEventListener("mouseup", mouseupfn);
      canvas.removeEventListener("mousemove", mousemovefn);

      canvas.removeEventListener("touchstart", mousedownfn);
      canvas.removeEventListener("touchmove", mousemovefn);
      canvas.removeEventListener("touchend", mouseupfn);

      socket.off("beginpath", handleBrginPath);
      socket.off("drawpath", handledrawPath);
    };
  }, []);
  return (
    <div>
      <canvas ref={canvasref}></canvas>
      {console.log(color, size)}
    </div>
  );
}

export default Board;
