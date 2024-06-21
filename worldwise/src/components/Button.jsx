import PropTypes from 'prop-types'
import styles from './Button.module.css'

Button.propTypes={
    children:PropTypes.any,
    type:PropTypes.string,
    onClick:PropTypes.func,
}


function Button({children,type,onClick}) {
    return (
        <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
