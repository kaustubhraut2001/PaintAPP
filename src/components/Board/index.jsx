import React, { useRef ,useEffect, useLayoutEffect} from 'react'
import { useSelector , useDispatch } from 'react-redux';

function Board() {
	const canvasref  = useRef(null);
	const shouddraw = useRef(false);
	useEffect(()=>{
		if(!canvasref.current ){
			return;
		}
		const canvas = canvasref.current;
		const context = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		 canvas.height = window.innerHeight;

	},[])

	const activemenuitemm = useSelector((state)=>state.menu.activeMenuItem);
	const {color , size } = useSelector((state)=>state.toolkit[activemenuitemm]);


	useLayoutEffect(()=>{
		const canvas = canvasref.current;
		const context = canvas.getContext('2d');



		const configchange = ()=>{

			context.strokeStyle = color;
			context.lineWidth = size;
		}
		const mousedownfn = (e)=>{
			shouddraw.current = true;
			context.beginPath();
			context.moveTo(e.clientX , e.clientY);

		}
		const mouseupfn = (e)=>{
			shouddraw.current = false;



		}
		const mousemovefn = (e)=>{
			if(!shouddraw.current){
				return;

			}
			context.lineTo(e.clientX , e.clientY);
			context.stroke();
		}



		canvas.addEventListener('mousedown' , mousedownfn);
		canvas.addEventListener('mouseup' , mouseupfn);
		canvas.addEventListener('mousemove' , mousemovefn);
		configchange();

		return ()=>{
			canvas.removeEventListener('mousedown' , mousedownfn);
			canvas.removeEventListener('mouseup' , mouseupfn);
			canvas.removeEventListener('mousemove' , mousemovefn);
		}

	},[color , size]);
  return (
	<div>
		<canvas ref = {canvasref}></canvas>
		{console.log(color , size)}
	</div>
  )
}

export default Board