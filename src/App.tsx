import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Typewriter from "react-typewriter-animate";
import { EmailForm } from './components/EmailForm/EmailForm';
import { Modal } from './components/Modal/Modal';
import "react-typewriter-animate/dist/Typewriter.css";
import './App.css'
import { LogoParallax } from './components/LogoParallax/LogoParallax';

function App() {
  const [showModal, setShowModal] = useState(false)

  const emailReqComplete = (successful: boolean) => {
    setShowModal(false)
    successful ?
      toast('Congratulations, e-mail sent successfully! 🐱', { position: "bottom-center" }) : toast.error('Sorry, please try again! 😿');
  }

  return (
    <>
      <div className='header'>
        <button className="email-button" onClick={() => setShowModal(true)} style={{ padding: '12px' }}>
          <HiOutlineMail />Email Me
        </button>
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={"Send me an email."} >
          <EmailForm onComplete={emailReqComplete} />
        </Modal>
      </div>
      <div className='home-page'>

        <Typewriter start={true} dataToRotate={[
          [
            { type: 'word', text: 'Hello World Lorenzo.', spanClass: "tw-text" },
            { type: 'action', action: 'delete', amount: 'Wolrd Lorenzo.'.length },
            { type: "word", text: "Recruiter.", spanClass: "tw-text blue" }
          ]
        ]} />

        <p className="read-the-docs">
          Full portfolio coming soon. Meanwhile <a href='/lorenzo-covarrubias-resume-2025.pdf' download='/lorenzo-covarrubias-resume-2025.pdf'>download my resume here.</a>
        </p>
        <div className="link-container">
          <FaLinkedin size={24} onClick={() => window.open(
            'https://www.linkedin.com/in/lorenzocova'
          )} />
          <FaGithubSquare size={24} onClick={() => window.open(
            'https://www.github.com/lorenzocovarrubiasjr'
          )} />
        </div>
      </div>
      <ToastContainer />
      <LogoParallax />
    </>
  )
}

export default App
