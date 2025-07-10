import { createPortal } from 'react-dom';
import { FaWindowClose } from "react-icons/fa";
import './Modal.css'


interface ModalProps {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({ children, title, isOpen, onClose }: ModalProps) => {
    let modalRoot = document.getElementById("modal-root")
    if (!modalRoot) {
        modalRoot = document.createElement("div")
        modalRoot.id = "modal-root"
        document.body.appendChild(modalRoot);
    }

    if (!isOpen) return null;

    return createPortal(
        <div className={`overlay ${isOpen ? 'show' : ''}`}>
            <div className="backdrop" >
                <div className="modal-3d">
                    <div className="modal-header">
                        <h2 className="title">{title}</h2>
                        <FaWindowClose size={24} style={{ lineHeight: "24px" }} onClick={onClose} />
                    </div>
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    )
}