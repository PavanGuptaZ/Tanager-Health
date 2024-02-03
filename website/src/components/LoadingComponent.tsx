import styles from '../styles/Loading.module.css';
import PropTypes from 'prop-types'

export const LoadingComponent = (props: { styles?: object }) => {
    return (
        <ul className={styles.waveMenu} style={{ ...props.styles }}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul >
    )
}

LoadingComponent.propTypes = {
    styles: PropTypes.object
}