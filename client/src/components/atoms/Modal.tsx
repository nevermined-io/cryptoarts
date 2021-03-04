import React from 'react'
import ReactModal from 'react-modal'
import styles from './Modal.module.scss'

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#root')

const Modal = ({
    title,
    description,
    isOpen,
    toggleModal,
    children,
    onAfterOpen,
    onRequestClose,
    overrideButton = false,
    ...props
}: {
    title: string
    description?: string
    isOpen: boolean
    toggleModal: () => void
    children: any
    onAfterOpen?: () => void
    onRequestClose?: () => void
    overrideButton?: boolean
}) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            contentLabel={title}
            className={styles.modal}
            overlayClassName={styles.modalOverlay}
            {...props}
        >
           {!overrideButton &&
                <button
                    className={styles.close}
                    onClick={toggleModal}
                    data-testid="closeModal"
                >
                    &times;
                </button>
            }

            <header className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
            </header>

            {children}
        </ReactModal>
    )
}

export default Modal
