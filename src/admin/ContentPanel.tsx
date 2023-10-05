import { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup';
import { createContent } from '../services/FragmentsService';
import { User } from '../models/user';
import MoonLoader from 'react-spinners/MoonLoader';

type Props = {
    activeDiv: number,
    setActiveDiv: (index: number) => void,
    alert: boolean,
    setAlert: (bool: boolean) => void,
    fragId: number,
    admin: User
}

const validationContent = yup.object({
    content: yup.mixed().test('content', 'Contenu requis', (value) => {
        return value !== undefined;
    }),
    type: yup.string().required('Type requis.')
})

export default function ContentPanel({activeDiv, setActiveDiv, alert, setAlert, fragId, admin}: Props) {

    const [isLoading, setIsLoading] = useState(false)

    const contentFormik = useFormik({
        initialValues: {
            content: null,
            type: ''
        },
        validationSchema: validationContent,
        onSubmit: async (cont, { resetForm }) => {
            try {
                setIsLoading(true)
                const file = cont.content
                const type = cont.type
                await createContent(file, fragId, type, admin.token)
                // setActiveDiv(3)
                setIsLoading(false)
                resetForm()
            } catch (error) {
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 3000)
            }
        }
    })

    const handleNext = () => {
        setActiveDiv(3)
    }

  return (
    <div className={`creationbox ${activeDiv === 2 ? 'center' : activeDiv < 2 ? 'admin-right' : 'admin-left'} h-full flex flex-col justify-center`}>
        <form className='flex flex-col justify-evenly h-auto p-10 text-blue-950 w-full' onSubmit={contentFormik.handleSubmit}>
            <div className='flex flex-col justify-center mb-4'>
                <label className='mb-2 text-2xl font-bold'>Content</label>
                <input className='mb-6' name='content' type='file' onChange={(event) => {contentFormik.setFieldValue('content', event.currentTarget.files![0]);}}/>
                {contentFormik.touched.content && contentFormik.errors.content ? (
                    <p className="error text-center text-red-400 font-bold mt-2">{contentFormik.errors.content}</p>
                ) : null}
            </div>
            <div className='flex flex-col justify-center mb-16'>
                <label className='mb-2 text-2xl font-bold' htmlFor='type'>Type</label>
                <select
                    id="type"
                    name="type"
                    onChange={contentFormik.handleChange}
                    onBlur={contentFormik.handleBlur}
                    value={contentFormik.values.type}
                >
                    <option value="" label="Select an option" />
                    <option value="text" label="Texte" />
                    <option value="audio" label="Audio" />
                    <option value="image" label="Image" />
                    <option value="video" label="Video" />
                </select>
                {contentFormik.touched.type && contentFormik.errors.type ? (
                    <p className="error text-center text-red-400 font-bold mt-2">{contentFormik.errors.type}</p>
                ) : null}
            </div>
            <button className=' bg-slate-500 text-white border-2 border-slate-950 hover:bg-slate-400 hover:text-black rounded-md p-2 w-1/2 mx-auto' type='submit'>Créer Content</button>
        </form>
        {isLoading ? <MoonLoader color='rgba(40, 67, 135,1)'/> : null}
        <button onClick={handleNext}>Next</button>
        {alert ? <div className='bg-red-200 text-red-900 flex justify-center items-center w-80 h-12 rounded-md border-red-900 mt-8'>Echec dans la création du contenu !</div> : null}
    </div>
  )
}