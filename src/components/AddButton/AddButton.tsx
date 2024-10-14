import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import styles from './AddButton.module.scss';
import { MdAddCircle } from 'react-icons/md';


export default function AddButton({ onClick, color }: { onClick: () => void, color?: string }) {

    return (
        <span><MdAddCircle className={styles['add-button']} size={36} onClick={onClick} /></span>
    )
}
