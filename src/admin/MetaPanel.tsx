import { useFormik } from 'formik'
import * as yup from 'yup';
import { createMeta } from '../services/FragmentsService';
import { User } from '../models/user';

type Props = {
    activeDiv: number,
    setActiveDiv: (index: number) => void,
    alert: boolean,
    setAlert: (bool: boolean) => void,
    setFragId: (id: number) => void,
    admin: User
}

const validationMeta = yup.object({
    title: yup.string().required('Titre requis.'),
    description: yup.string().required('Description requise.'),
    number: yup.number().min(1, "L'id ne peut pas être égal à 0").required('Numéro de fragment requis')
})

export default function MetaPanel({activeDiv, setActiveDiv, alert, setAlert, setFragId, admin}: Props) {

    const metaFormik = useFormik({
        initialValues: {
            title: '',
            description: '',
            number: 0
        },
        validationSchema: validationMeta,
        onSubmit: async (meta, { resetForm }) => {
            try {
                const id = await createMeta(meta, admin.token)
                setFragId(id)
                setActiveDiv(2)
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
    <div className={`creationbox ${activeDiv > 1 ? 'admin-left' : 'center'} h-full flex items-center`}>
            <form className='flex flex-col justify-evenly h-auto p-10 text-blue-950 w-full' onSubmit={metaFormik.handleSubmit}>
                <div className='flex flex-col'>
                    <label className='mb-2 text-2xl font-bold'>Titre</label>
                    <input className='mb-6' name='title' type='text' onChange={metaFormik.handleChange} onBlur={metaFormik.handleBlur} value={metaFormik.values.title}/>
                    {metaFormik.touched.title && metaFormik.errors.title ? (
                        <p className="error text-center text-red-400 font-bold mt-2">{metaFormik.errors.title}</p>
                    ) : null}
                </div>
                <div className='flex flex-col'>
                    <label className='mb-2 text-2xl font-bold'>Description</label>
                    <textarea className='mb-6' name='description' onChange={metaFormik.handleChange} onBlur={metaFormik.handleBlur} value={metaFormik.values.description}/>
                    {metaFormik.touched.description && metaFormik.errors.description ? (
                        <p className="error text-center text-red-400 font-bold mt-2">{metaFormik.errors.description}</p>
                    ) : null}
                </div>
                <div className='flex flex-col mb-8'>
                    <label className='mb-2 text-2xl font-bold'>Number</label>
                    <input className='mb-6' name='number' type='number' onChange={metaFormik.handleChange} onBlur={metaFormik.handleBlur} value={metaFormik.values.number}/>
                    {metaFormik.touched.number && metaFormik.errors.number ? (
                        <p className="error text-center text-red-400 font-bold mt-2">{metaFormik.errors.number}</p>
                    ) : null}
                </div>
                <button className=' bg-slate-500 text-white border-2 border-slate-950 hover:bg-slate-400 hover:text-black rounded-md p-2 w-1/2 mx-auto' type='submit'>Créer Meta</button>
            </form>
            {alert ? <div className='bg-red-200 text-red-900 flex justify-center items-center w-80 h-12 rounded-md border-red-900 mt-8'>Echec dans la création des métadonnées !</div> : null}
        </div>
  )
}