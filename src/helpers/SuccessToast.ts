import { toast } from 'react-toastify'

export const successToast = () => {
  toast.success('Respuesta correcta 🥳', {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
    closeButton: false
  })
}
