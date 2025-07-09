
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { Spiral } from 'ldrs/react'
import 'ldrs/react/Spiral.css'
import './EmailForm.css'

interface EmailFormProps {
    onComplete: (successful: boolean) => void;
}

export const EmailForm = ({ onComplete }: EmailFormProps) => {
    const frm = useRef<HTMLFormElement>(null)
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;

    const handleChange = () => {
        const company = frm.current?.company.value;
        const user_name = frm.current?.user_name.value;
        const email = frm.current?.email.value ?? /\S+@\S+\.\S+/.test(frm.current?.email.value);
        const phone = frm.current?.phone.value;
        const message = frm.current?.message.value;

        setIsValid(!!company && !!user_name && (!!email || !!phone) && !!message);
    };

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault();
        if (!frm.current) return;

        emailjs
            .sendForm(VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, frm.current, {
                publicKey: VITE_EMAILJS_PUBLIC_KEY,
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    onComplete(true)
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    onComplete(false)
                },
            ).finally(() => { setIsLoading(false); })
    }

    return (
        <form id="form" ref={frm} onSubmit={sendEmail}>
            <div className="field">
                <label>company</label>
                <input type="text" name="company" onChange={handleChange} disabled={isLoading} />
            </div>
            <div className="field">
                <label>name</label>
                <input type="text" name="user_name" onChange={handleChange} disabled={isLoading} />
            </div>
            <div className="field">
                <label>email</label>
                <input type="text" name="email" onChange={handleChange} disabled={isLoading} />
            </div>
            <div className="field">
                <label>phone</label>
                <input type="number" name="phone" onChange={handleChange} disabled={isLoading} />
            </div>
            <div className="field">
                <label>message</label>
                <textarea name="message" onChange={handleChange} rows={4} disabled={isLoading} />
            </div>

            {isLoading ?
                <div className='loading'>
                    <Spiral
                        size="40"
                        speed="0.9"
                        color="blue"
                    />
                </div> :
                <input
                    type="submit"
                    id="button"
                    value="Send Email"
                    disabled={!isValid}
                    style={{
                        opacity: isValid ? 1 : 0.5,
                        cursor: isValid ? 'pointer' : 'not-allowed',
                    }}
                />}
        </form>

    )
}