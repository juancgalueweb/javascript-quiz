import { toast } from 'react-toastify'

export const errorToast = () => {
  toast.error('Respuesta incorrecta 🫠', {
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
