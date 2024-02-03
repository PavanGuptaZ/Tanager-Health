import { useContext, useState } from 'react';
import styles from '../../styles/ProfilePage.module.css';
import { PersonIconsIndex } from '../../assets/svgs/persons/PersonIconsIndex';
import { namePattern, relationPattern } from '../../utils/regex';
import { useKey } from '../../hooks/useKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { differenceInCalendarYears, format } from 'date-fns';
import { postPersons } from '../../apis/person/postPersons';
import { IoIosCloseCircle } from "react-icons/io";
import { BlocksContext } from '../../hooks/ContextProvider';

const initialValues = { profileIcon: 0, name: "", relation: "", dateOfBirth: "" }

export const NewPersonBlock = () => {
    const { setDisplayBlocks, personData } = useContext(BlocksContext)
    const [popUpOptions, setPopUpOptions] = useState({ show: false, focus: "message" })
    const [values, setValues] = useState(personData === null ? { ...initialValues } : { ...personData, dateOfBirth: format(personData.dateOfBirth, 'yyyy-MM-dd') })
    const queryClient = useQueryClient()

    const closeFn = () => {
        setDisplayBlocks((prev) => ({ ...prev, person: false, personData: null }))
        setValues(initialValues)
    }
    useKey('escape', closeFn)
    const AddPersonMutation = useMutation({
        mutationKey: ['addPerson'],
        mutationFn: (variables: { profileIcon: number, name: string, relation: string, dateOfBirth: string, _id?: string | number }) => postPersons(variables),
        onSuccess: (data) => {
            if (data?.status === "success") {
                closeFn()
                queryClient.invalidateQueries({ queryKey: ['personList'] })
                toast.info(data.newPerson.name + " is added")
            } else {
                const message = data?.message || "Something went Wrong, try Again"
                toast.warn(message)
            }
        }
    })
    const handleIconSelect = (numb: number) => {
        setValues((prev) => ({ ...prev, profileIcon: numb }))
    }
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length < 35) {
            setValues((prev) => ({ ...prev, name: value }))
        }
    }
    const handleRelationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length < 15) {
            setValues((prev) => ({ ...prev, relation: value }))
        }
    }
    const handleDataOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        const value = e.target.value;
        // const value = new Date(e.target.value).toLocaleDateString();
        setValues((prev) => ({ ...prev, dateOfBirth: value }))
    }

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (checks.name && checks.relation && checks.dateOfBirth) {
            AddPersonMutation.mutate(values)
        } else {
            toast.warn('checks all Values')
        }
    }

    const messages: { [index: string]: string, message: string, name: string, relation: string, dateOfBirth: string } = {
        message: "Select icon and fill form",
        name: "Name should be one or two words, no extra spacing & between 5 to 30 characters.",
        relation: "between 3 to 10 characters.",
        dateOfBirth: "Age between 1 to 100 characters.",
    }
    const checks: { [index: string]: boolean } = {
        message: true,
        name: namePattern.test(values.name.trim()),
        relation: relationPattern.test(values.relation.trim()),
        dateOfBirth: differenceInCalendarYears(Date.now(), new Date(values.dateOfBirth)) <= 100 && differenceInCalendarYears(Date.now(), new Date(values.dateOfBirth)) >= 1,
    }
    // console.log(format(new Date(values.dateOfBirth || 0), 'yyyy-MM-dd'))
    // console.log(values.dateOfBirth)
    return (
        <div className={styles.AddNewPopup}>
            <div className={styles.AddNewBox}>
                <IoIosCloseCircle className={styles.closeIcon} onClick={closeFn} />
                <div className={styles.listBox}>
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => {
                        return (
                            <div key={num} className={styles.selectIcons} onClick={() => handleIconSelect(num)}>
                                <PersonIconsIndex profileIcon={num} />
                            </div >
                        )
                    })}
                </div>
                <div className={styles.NewDisplayBlock} >
                    <PersonIconsIndex profileIcon={values.profileIcon} />
                    <div className={styles.Name}>
                        {values.name || "Enter Name"}
                    </div>
                    <div className={styles.relation}>
                        {values.relation || "Enter Relation"}
                    </div>
                    <div className={styles.age}>
                        {values.dateOfBirth || "Enter Age"}
                    </div>
                </div>
                <form className={styles.NewDetailsBlock} onSubmit={handelSubmit}>
                    <input type="text" name="name" id="" placeholder='Enter Name'
                        onFocus={() => setPopUpOptions((prev) => ({ ...prev, focus: "name" }))}
                        value={values.name} onChange={(e) => handleNameChange(e)}
                    />
                    <input type="text" name="relation" id="" placeholder='Enter Relation'
                        onFocus={() => setPopUpOptions((prev) => ({ ...prev, focus: "relation" }))}
                        value={values.relation} onChange={(e) => handleRelationChange(e)}
                    />
                    <input type="date" name="age" min={1} max={100} id="" placeholder='Enter Age'
                        onFocus={() => setPopUpOptions((prev) => ({ ...prev, focus: "dateOfBirth" }))}
                        value={values.dateOfBirth} onChange={(e) => handleDataOfBirthChange(e)}
                    />
                    <button type='submit' style={{ height: '35px', minWidth: "100px" }} className='submitBTN'
                        disabled={(!checks.name && !checks.relation && !checks.dateOfBirth) || AddPersonMutation.isPending}>
                        {AddPersonMutation.isPending ? <div className='lds-ellipsis'>
                            <div></div><div></div><div></div><div></div>
                        </div>
                            : 'Submit'}
                    </button>
                    <div className={styles.message + " " + (!checks[popUpOptions.focus] ? styles.red : " ")}>
                        {messages[popUpOptions.focus]}
                    </div>
                </form>
            </div>
        </div>
    )
}


