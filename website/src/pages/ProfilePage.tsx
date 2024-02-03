import styles from '../styles/ProfilePage.module.css';
import { Heading } from '../components/Heading'
import { useGetUser } from '../hooks/index.js';
import { PersonBlock } from '../components/profilePage/PersonBlock.jsx';
import { UserIconsIndex } from '../assets/svgs/users/UserIconsIndex.js'
import { useQuery } from '@tanstack/react-query';
import { getPersonsList } from '../apis/person/getPersons.js';
import { LoadingComponent } from '../components/LoadingComponent.jsx';
import { CiSquarePlus } from 'react-icons/ci';
import { useContext } from 'react';
import { BlocksContext } from '../hooks/ContextProvider.jsx';
import { RegisterAndLoginPage } from './RegisterAndLoginPage.js';
import { getRoleString } from '../utils/getRole.js';
import { format } from 'date-fns';
import PersonType from '../interfaces/api/personFace.js';

export const ProfilePage = () => {
    const user = useGetUser()
    const { setDisplayBlocks } = useContext(BlocksContext)

    const PersonQuery = useQuery({
        queryKey: ['personList'],
        queryFn: () => getPersonsList(),
        enabled: !!user
    })

    if (!user) return <RegisterAndLoginPage type='login' />

    return (
        <div className={styles.ProfilePageBox + " widthControl"}>
            <div className={styles.ProfileHead}>
                <div className={styles.ProfilePictureBox + " iconBackgroundBox"}>
                    <UserIconsIndex profileIcon={user ? user.profileIcon : 0} />
                </div>
                <div className={styles.asideDeatils}>
                    <div className={styles.header}>
                        <div className={styles.name}>
                            {user.name}
                        </div>
                    </div>
                    <div className={styles.DetailsBox}>
                        <div className={styles.Details}>
                            <span className={styles.sideHead}>{getRoleString(user.role).toUpperCase() + " ID"}</span>
                            <span>{"- " + user._id}</span>
                        </div>
                        <div className={styles.Details}>
                            <span className={styles.sideHead}>EMAIL ID</span>
                            <span>{"- " + user.email}</span>
                        </div>
                        <div className={styles.Details}>
                            <span className={styles.sideHead}>Joined On</span>
                            <span>{"- " + format(user.createdAt, 'dd/MM/yyyy')}</span>
                        </div>
                        <div className={styles.Details}>
                            <span className={styles.sideHead}>Phone</span>
                            <span>{"- " + user.phone}</span>
                        </div>
                        <div className={styles.Details}>
                            <span className={styles.sideHead}>Address</span>
                            <span> - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis veniam error necessitatibus, earum nisi magni maxime qui harum culpa </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.personsListBox}>
                <Heading text='Persons list' size={1.5} />
                <div className={styles.personsList}>
                    {PersonQuery.data?.status === 'success' &&
                        PersonQuery.data.list.map((ele: PersonType) => {
                            return <PersonBlock key={ele._id} data={ele} />
                        })}
                    <div className={styles.NewPerson} >
                        <div style={{ margin: "auto" }}
                            onClick={() => setDisplayBlocks((prev) => ({ ...prev, person: true }))}
                        >
                            <CiSquarePlus style={{ fontSize: "5rem", display: "block", margin: "auto" }} />
                            Add New Person
                        </div>
                    </div>
                    {PersonQuery.isFetching && <div className={styles.loadingBox}>
                        <LoadingComponent />
                    </div>}
                </div>
            </div>
        </div>
    )
}
