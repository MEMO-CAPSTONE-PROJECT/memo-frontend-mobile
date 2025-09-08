import { createContext, useContext, useReducer } from "react";
import { Modal } from "react-native";

interface ModalContextValues<ModalProps = any> {
    showModal: (
        component: React.ComponentType<ModalProps>,
        modalProps?: ModalProps
      ) => void
    hideModal: () => void
    component: React.FC<ModalProps>
    modalProps: any
  }

const ModalContext = createContext<ModalContextValues>({
    component: () => null,
    modalProps: {},
    showModal: () => undefined,
    hideModal: () => undefined
})

interface ModalProviderProps {
    animated?: "none" | "slide" | "fade"
    children: React.ReactNode
}

export function ModalProvider({ children, animated = "fade" }: Readonly<ModalProviderProps>) {
    const initialState = {
        component: null,
        modalProps: {},
        showModal: (component: React.FC, modalProps = {}) => {
            dispatch({ type: "SHOW", component, modalProps })
        },
        hideModal: () => {
            dispatch({ type: "HIDE" })
        }
    }
    const [state, dispatch] = useReducer((state: any, action: any) => {
        switch (action.type) {
            case "SHOW":
                return {
                    ...state,
                    component: action.component,
                    modalProps: action.modalProps
                }
            case "HIDE":
                return {
                    ...state,
                    component: null,
                    modalProps: {}
                }
            default:
                throw new Error("Unhandled action type")
        }
    }, initialState)

    return (
        <ModalContext.Provider value={state}>
            <Modal animationType={animated} visible={state?.component !== null}>
                <ModalComponent/>
            </Modal>
            {children}
        </ModalContext.Provider>
    )
}

function ModalComponent() {
    const { component: Component, showModal, hideModal, modalProps } = useContext(ModalContext)
    if (!Component) return null
    return (
        <Component 
            hideModal={hideModal} 
            showModal={showModal} 
            {...modalProps}
        />
    )
}

export const useModal = () => useContext(ModalContext)