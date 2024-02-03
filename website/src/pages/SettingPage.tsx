import { useContext, useEffect, useRef, useState } from 'react';
import { UserIconsIndex } from '../assets/svgs/users/UserIconsIndex'
import { useUserFetching } from '../hooks'
import styles from '../styles/SettingPage.module.css'
import { Heading } from '../components/Heading';
import { namePattern, passwordPattern } from '../utils/regex';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../apis/auth/updateUser';
import { toast } from 'react-toastify'
import { getRoleNumber } from '../utils/getRole';
import UserType from '../interfaces/api/userFace';
import { UserContext } from '../hooks/ContextProvider';

export const SettingPage = () => {
    const { dispatchData, user } = useContext(UserContext)
    const [checks, setchecks] = useState(false)
    const initialValues: Pick<UserType, "name" | "password" | "address" | "phone" | "profileIcon"> = user ?
        { ...user, password: "" } : { name: "", phone: 0, profileIcon: 0, address: "", password: "", };
    const [values, setValues] = useState(initialValues)
    const ProfilePictureList = useRef<HTMLDivElement>(null)
    const refreshLoading = useUserFetching()

    useEffect(() => {
        const list = ProfilePictureList.current?.querySelectorAll('div')
        list?.length && list.forEach((element: HTMLElement) => {
            element.classList.remove(styles.active)
        })
        const selectedElement = list?.length ? list[values.profileIcon - 1] : false

        if (selectedElement) {
            selectedElement.classList.add(styles.active)
        }
    }, [values.profileIcon])
    const userMutation = useMutation({
        mutationKey: ['userUpdate'],
        mutationFn: (variables: { role: number, data: object }) => updateUser(variables.role, variables.data),
        onSuccess: (data) => {
            if (data.status == "success") {
                setValues((prev) => ({ ...prev, password: "" }))
                toast.info("User Details Updated")
                setchecks(false)
                dispatchData({ type: 'updateUser', payload: values })
            } else {
                toast.warn(data.message)
            }
        }
    })

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setchecks(true)
        if (!values.password) {
            toast.warn('Enter Password')
            return
        }
        if (!TotalCheck && NameCheck && PhoneCheck && AddressCheck && PasswordCheck) {
            user && userMutation.mutate({ role: getRoleNumber(user.role), data: values })
        } else {
            toast.warn('Check all details')
        }
    }
    const handleProfilePicChange = (value: number) => {
        setValues((prev) => ({ ...prev, profileIcon: value }))
    }

    const NameCheck = namePattern.test(values.name.trim());
    const PhoneCheck = typeof values.phone === 'number' && values.phone < 10000000000 && values.phone > 6999999999
    const AddressCheck = values.address?.trim().length < 151 && values.address?.trim().length > 9
    const TotalCheck = values.address == initialValues.address && values.name == initialValues.name && values.phone == initialValues.phone && values.profileIcon == initialValues.profileIcon
    const PasswordCheck = typeof values.password == 'string' && passwordPattern.test(values.password.trim())

    return (
        <div className={styles.SettingPageBox + " widthControl"}>
            <form onSubmit={handelSubmit} className={styles.ProfileUpdates}>
                <Heading text='Profile Updates' size={1.5} weight={600} upper={true} />
                <div className={styles.profileIconUpdate}>
                    <div className={styles.ProfilePictureBox}>
                        <UserIconsIndex profileIcon={values.profileIcon} />
                    </div>
                    <div className={styles.ProfilePictureList} ref={ProfilePictureList}>
                        {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => {
                            return (
                                <div key={num} className={`${styles.selectIcons}  ${values.profileIcon == num ? styles.active : ""}`}
                                    onClick={() => handleProfilePicChange(num)}>
                                    <UserIconsIndex profileIcon={num} />
                                </div >
                            )
                        })}
                    </div>
                </div>
                <Heading text='select required icon' size={1} />
                <div className={styles.profileDetailsUpdate}>
                    <div className={styles.ProfileDetails}>
                        <label htmlFor="settingName" className={styles.label}>Name</label>
                        <input type="text" name="name" id="settingName" className={styles.input} placeholder='Name Here'
                            value={values.name} onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))} />
                    </div >
                    {!NameCheck &&
                        <div className={styles.warning}>one or two words, no extra spacing & between 5 to 30 characters.</div>}

                    <div className={styles.ProfileDetails}>
                        <label htmlFor="settingPhone" className={styles.label}>Phone</label>
                        <input type="number" max={9999999999} min={6999999999} name="phone" id="settingPhone"
                            className={styles.input} placeholder='Phone Here'
                            value={values.phone} onChange={(e) => setValues((prev) => ({ ...prev, phone: Number(e.target.value) }))} />
                    </div >
                    {!PhoneCheck &&
                        <div className={styles.warning}>Valid 10 digits number.</div>}

                    <div className={styles.ProfileDetails}>
                        <label htmlFor="settingAddress" className={styles.label}>Address</label>
                        <textarea typeof='text' name="name" id="settingAddress" className={styles.addressInput} placeholder='Address Here'
                            value={values.address} onChange={(e) => setValues((prev) => ({ ...prev, address: e.target.value }))} />
                    </div >
                    {!AddressCheck &&
                        <div className={styles.warning}> {values.address?.length ?? 0} - between 10 to 150 characters.</div>}

                    <div className={styles.ProfileDetails}>
                        <label htmlFor="settingPassword" className={styles.label}>Passsword</label>
                        <input type="password" name="name" id="settingPassword" className={styles.input} placeholder='Password Here'
                            value={values.password} onChange={(e) => setValues((prev) => ({ ...prev, password: e.target.value }))} />
                    </div >
                    {checks && !PasswordCheck &&
                        <div className={styles.warning}> {values.password?.length}- no Spacing, atleast contain one capital, small letter, number and one from @, &, *, #, $, !, ? and limit of 3 to 20.</div>}

                </div>
                <div>
                    <button type='submit' style={{ height: '35px', minWidth: "100px" }}
                        disabled={TotalCheck || userMutation.isPending || refreshLoading} className={'submitBTN'}>
                        {(userMutation.isPending || refreshLoading) ? <div className='lds-ellipsis'>
                            <div></div><div></div><div></div><div></div>
                        </div>
                            : 'Submit'}
                    </button>
                </div>
            </form>
        </div >
    )
}
