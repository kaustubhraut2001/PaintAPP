import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPencil , faEraser , faRotateLeft, faRotateRight,faFileArrowDown} from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames';


import styles from './index.module.css'
import { useDispatch , useSelector } from 'react-redux'
import { menuItemClick ,actionitemcliick } from '@/Redux/Slice/Menuslice'
import { MENU_ITEMS } from '@/constants'

const Menu = () => {
	const dispatch = useDispatch();

	const handlemenuclick = (menuitem) => {
		dispatch(menuItemClick(menuitem))
	}
	const activemenuitemm = useSelector((state)=>state.menu.activeMenuItem)

  return (
	<div className={styles.menucomponent}>

	<div className= {cx(styles.iconWrapper ?  [styles.active] :activemenuitemm === MENU_ITEMS.PENCIL )} onClick={()=>{
		handlemenuclick(MENU_ITEMS.PENCIL)
	}} >

	<FontAwesomeIcon icon={faPencil}  className={styles.icon} />
	</div>



	<div  className= {cx(styles.iconWrapper ?  [styles.active] :activemenuitemm === MENU_ITEMS.ERASER )} onClick={()=>{
		handlemenuclick(MENU_ITEMS.ERASER)
	}}>
	<FontAwesomeIcon icon={faEraser} className={styles.icon} />
	</div>



	<div  className= {cx(styles.iconWrapper ?  [styles.active] :activemenuitemm === MENU_ITEMS.UNDO )} onClick={()=>{
		handlemenuclick(MENU_ITEMS.UNDO)
	}}>
	<FontAwesomeIcon icon={faRotateLeft} className={styles.icon}
	/>
	</div>



	<div className= {cx(styles.iconWrapper ?  [styles.active] :activemenuitemm === MENU_ITEMS.REDO )} onClick={()=>{
		handlemenuclick(MENU_ITEMS.REDO)
	}}>
	<FontAwesomeIcon icon={faRotateRight} className={styles.icon}
	/>
	</div>



	<div  className= {cx(styles.iconWrapper ?  [styles.active] :activemenuitemm === MENU_ITEMS.DOWNLOAD )} onClick={()=>{
		handlemenuclick(MENU_ITEMS.DOWNLOAD	)
	}}>
	<FontAwesomeIcon icon={faFileArrowDown} className={styles.icon}
	 />
	</div>
	</div>
  )
}

export default Menu