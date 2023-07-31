import React from 'react'

import "./Register.css"

type Props = {}

const Register = (props: Props) => {
  const welcomingMessage: string = "Bienvenue à bord du Bougainville !"
  const welcomingMessage2: string = "Etes-vous prêts à commencer l'aventure ?"
  // const [welcMessDiv, setWelcMessDiv] = useState<HTMLElement | null>(null)

  // const displayWelcomeMessage = () => {
  //   const words = welcomingMessage.split(" ");
  //   let currentWordIndex = 0;

  //   const intervalId = setInterval(() => {
  //     if (currentWordIndex < words.length) {
  //       welcMessDiv!.textContent = words.slice(0, currentWordIndex +1).join(" ");
  //       currentWordIndex++;
  //     } else {
  //       clearInterval(intervalId)
  //     }
  //   }, 100)
  // }

  // useEffect(() => {
  //   setWelcMessDiv(document.getElementById("welcome-message"))
  //   displayWelcomeMessage()
  // })

  return (
    <div className='register-body bg-black text-white flex justify-center items-center'>
        <div className='bg-slate-600 w-1/3 p-10 h-1/2 flex flex-col rounded-lg typewriter css-typing'>
          <h3 className='text-white text-2xl font-bold'>{welcomingMessage}</h3>
          <h3 className='text-white text-2xl font-bold'>{welcomingMessage2}</h3>
          <div className='flex flex-col items-center justify-center'>
            <input className='p-2 mb-5 rounded-md text-black' type='text' placeholder='Email'/>
            <input className='p-2 mb-5 rounded-md text-black' type='password' placeholder='Mot de passe'/>
            <input className='p-2 rounded-md text-black' type='password' placeholder='Confirmer le mot de passe'/>
          </div>
          <div className='h-fit flex justify-center hover:bg-slate-600'>
            <button className='border-black border w-fit p-2 bg-slate-300 font-bold text-black rounded-md hover:bg-slate-400 hover:border-white hover:text-white'>S&apos;enregistrer</button>
          </div>
        </div>
    </div>
  )
}

export default Register