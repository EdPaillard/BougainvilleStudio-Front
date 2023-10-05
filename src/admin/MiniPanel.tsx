import { useFormik } from 'formik'
import * as yup from 'yup';
import { createMini } from '../services/FragmentsService';
import { User } from '../models/user';

type Props = {
    activeDiv: number,
    setActiveDiv: (index: number) => void,
    alert: boolean,
    setAlert: (bool: boolean) => void,
    fragId: number,
    admin: User
}

const validationMiniature = yup.object({
    mini: yup.mixed().test('mini', 'Miniature requise', (value) => {
        return value !== undefined;
    }),
})

export default function MiniPanel({activeDiv, setActiveDiv, alert, setAlert, fragId, admin}: Props) {

    const miniFormik = useFormik({
        initialValues: {
            mini: null
        },
        validationSchema: validationMiniature,
        onSubmit: async (mini, { resetForm }) => {
            try {
                const file = mini.mini
                await createMini(file, fragId, admin.token)
                setActiveDiv(1)
                resetForm()
            } catch (error) {
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 3000)
            }
        }
    })

  return (
    <div className={`creationbox ${activeDiv === 3 ? 'center' : activeDiv < 3 ? 'admin-right' : 'admin-left'} h-full flex items-center`}>
        <form className='flex flex-col justify-evenly h-auto p-10 text-blue-950 w-full' onSubmit={miniFormik.handleSubmit}>
            <div className='flex flex-col justify-center mb-16'>
                <label className='mb-2 text-2xl font-bold'>Miniature</label>
                <input className='mb-6' name='mini' type='file' onChange={(event) => {miniFormik.setFieldValue('mini', event.currentTarget.files![0]);}} onBlur={miniFormik.handleBlur}/>
            </div>
            <button className=' bg-slate-500 text-white border-2 border-slate-950 hover:bg-slate-400 hover:text-black rounded-md p-2 w-1/2 mx-auto' type='submit'>Créer Miniature</button>
        </form>
        {alert ? <div className='bg-red-200 text-red-900 flex justify-center items-center w-80 h-12 rounded-md border-red-900 mt-8'>Echec dans la création de la miniature !</div> : null}
    </div>
  )
}