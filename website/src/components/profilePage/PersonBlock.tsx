import { PersonIconsIndex } from '../../assets/svgs/persons/PersonIconsIndex';
import styles from '../../styles/ProfilePage.module.css';
import PropTypes from 'prop-types';
import { differenceInCalendarYears } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { useContext } from 'react';
import { BlocksContext } from '../../hooks/ContextProvider';
import PersonType from '../../interfaces/api/personFace';

export const PersonBlock = ({ data }: { data: PersonType }) => {
    const navigator = useNavigate()
    const { setDisplayBlocks } = useContext(BlocksContext)

    const handleEdit = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation()
        setDisplayBlocks((prev) => ({ ...prev, person: true, personData: data }))
    }

    return (
        <div className={styles.Person + " iconBackgroundBox"} onClick={() => navigator('/person/' + data._id)}>
            <FaEdit className={styles.editIcon} onClick={(e) => handleEdit(e)} />
            <div className={styles.PersonIcon + " iconBackgroundBox"}>
                <PersonIconsIndex profileIcon={data.profileIcon} />
            </div>
            <div className={styles.Name}>
                {data.name}
            </div>
            <div className={styles.relation}>
                {data.relation}
            </div>
            <div className={styles.age}>
                {differenceInCalendarYears(Date.now(), data.dateOfBirth)}
            </div>
        </div>
    )
}
PersonBlock.propTypes = {
    data: PropTypes.object
}