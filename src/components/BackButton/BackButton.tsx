import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import styles from './BackButton.module.scss';


export default function BackButton({ onNavigate, color }: { onNavigate: () => void, color?: string }) {

    return (
        <div
            className={styles["back-button"]}
            onClick={onNavigate

            }
        >
            <BsArrowLeft size={35} color={color ? color : 'inherit'} />
        </div>
    )
}
