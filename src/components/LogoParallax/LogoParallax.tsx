import { useEffect, useRef } from "react"
import HWL_logo from '../../assets/HWL_logo.png';
import './LogoParallax.css'

export const LogoParallax = () => {
    const logoRef = useRef<HTMLDivElement>(null);
    const mouse = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * -500;
            mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -500;
        }

        const update = () => {
            if (logoRef.current) {
                logoRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px`
            }
            rafId.current = requestAnimationFrame(update)
        }

        window.addEventListener('mousemove', handleMouseMove);
        rafId.current = requestAnimationFrame(update)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current) cancelAnimationFrame(rafId.current)
        }
    }, [])

    return (
        <div className="logo-parallax" ref={logoRef}>
            <img src={HWL_logo} alt="HelloWorldLorenzo logo" />
        </div>
    )
}