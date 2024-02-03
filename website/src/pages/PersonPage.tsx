import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPersonsById } from "../apis/person/getPersons.ts";
import styles from '../styles/PersonPage.module.css'
import { LoadingComponent } from "../components/LoadingComponent.tsx";
import { ErrorPage } from "./ErrorPage.tsx";
import { PersonIconsIndex } from '../assets/svgs/persons/PersonIconsIndex.jsx';
import { differenceInCalendarYears } from 'date-fns';
import { getAppointmentList } from "../apis/appointment/getAppointment.ts";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { Heading } from '../components/Heading.tsx'

export const PersonPage = () => {
    const { id } = useParams()

    const PersonQuery = useQuery({
        queryKey: [`person-${id}`],
        queryFn: () => getPersonsById(id)
    })
    const AppointmentListQuery = useQuery({
        queryKey: [`appointmentList-${id}`],
        queryFn: () => getAppointmentList(id)
    })

    if (PersonQuery.isLoading) {
        return <LoadingComponent />
    } else if (PersonQuery.error || PersonQuery.data.status == "error") {
        return <ErrorPage text={PersonQuery.data?.message} />
    }
    const { profileIcon, name, dateOfBirth } = PersonQuery.data.person
    return (
        <div className={"widthControl " + styles.PersonPageBox}>
            <div className={styles.ProfileBox}>
                <PersonIconsIndex profileIcon={profileIcon} />
                <div>{name}</div>
                <div>{differenceInCalendarYears(Date.now(), dateOfBirth)}</div>
            </div>
            <div className={styles.AppointmentBox}>
                <div className={styles.AppointmentBoxHead}>
                    <Heading text="Appointment List" size={1.25} />
                    <div className={styles.addIcon}>
                        <MdOutlineCreateNewFolder />
                    </div>
                </div>
                <div className={styles.AppointmentList}>
                    {AppointmentListQuery.isSuccess
                        && AppointmentListQuery.data?.status == "success" ?
                        AppointmentListQuery.data?.list.map((_ele: unknown, i: number) => {
                            return <p key={i}>AppointmentListQuery Data - {i}</p>
                        })
                        : AppointmentListQuery.data?.message}
                </div>
            </div>
        </div>
    )
}
