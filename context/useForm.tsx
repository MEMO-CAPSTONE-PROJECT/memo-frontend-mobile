import { createContext, useCallback, useContext, useState } from "react";
import { ZodFormattedError } from "zod";

type NestedKeyOf<T> = T extends object
    ? {
          [K in keyof T & string]: T[K] extends (infer U)[]
              ? `${K}` | `${K}.${number}` | `${K}.${number}.${NestedKeyOf<U>}`
              : T[K] extends object
              ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
              : `${K}`
      }[keyof T & string]
    : never

type NestedValue<T, K extends NestedKeyOf<T>> = K extends `${infer P}.${infer Rest}`
    ? P extends keyof T
        ? T[P] extends (infer U)[]
            ? Rest extends `${number}`
                ? U // If it's an array, resolve the value type of the array element
                : Rest extends NestedKeyOf<U>
                ? NestedValue<U, Rest> // Recurse for nested arrays
                : any
            : Rest extends NestedKeyOf<T[P]>
            ? NestedValue<T[P], Rest> // Recurse for nested objects
            : never
        : never
    : K extends keyof T
    ? T[K] // Base case: Return the type of the property itself
    : never

interface FormContextType<T extends object> {
    form: T;
    update: <K extends NestedKeyOf<T>>(key: K, value: NestedValue<T, K>, clearError?: boolean) => void
    reset: (values: Partial<T>) => void
    clear: () => void
    errors?: ZodFormattedError<T, string>
    setErrors: React.Dispatch<React.SetStateAction<ZodFormattedError<T, string> | undefined>>
    setError: <K extends NestedKeyOf<T>>(key: K, error: string | undefined) => void
}

const FormContext = createContext<FormContextType<any> | null>(null)

interface FormProviderProps<T extends object> {
    initialValues: T
    children: React.ReactNode
}

export function FormProvider<T extends object>({ children, initialValues }: Readonly<FormProviderProps<T>>) {
    const [form, setForm] = useState<T>(initialValues)
    const [errors, setErrors] = useState<ZodFormattedError<T, string> | undefined>(undefined)

    const update = <K extends NestedKeyOf<T>>(key: K, value: NestedValue<T, K>, clearError?: boolean) => {
        if (clearError) 
            setError(key, undefined)

        setForm((prev) => {
            const keys = key.split(".") // Split key into parts
            const clone: any = { ...prev }

            let current = clone
            for (let i = 0; i < keys.length; i++) {
                const k = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]) // Handle array indices
                if (i === keys.length - 1) {
                    current[k] = value // Set the final nested value
                } else {
                    current[k] = Array.isArray(current[k])
                        ? [...current[k]] // Clone array for immutability
                        : { ...current[k] } // Clone object for immutability
                    current = current[k]
                }
            }

            return clone
        })
    }

    const reset = useCallback((values: Partial<T>) => {
        setForm(({ ...initialValues, ...values }))
    }, [initialValues])

    const clear = () => {
        setForm(initialValues)
        setErrors(undefined)
    }

    const setError = <K extends NestedKeyOf<T>>(key: K , error: string | undefined) => {
        //ZodFormattedError nested setErrors by id 
        // Example output {"_errors":[],"name":{"_errors":["กรุณาใส่ชื่อเป้าหมาย"]},"amount":{"_errors":["กรุณาใส่จำนวนที่เข้าร่วม"]},"points":{"0":{"_errors":[],"id":{"_errors":["กรุณาใส่กลุ่มความถนัด"]},"normal":{"_errors":["กรุณาใส่คะแนนคนที่ผ่าน"]},"excellent":{"_errors":["กรุณาใส่คะแนนคนเก่ง"]}},"_errors":[]},"description":{"_errors":["กรุณาใส่รายละเอียด"]},"endDate":{"_errors":["วันที่ปิดควรมากกว่าวันที่เปิด"]}}
        setErrors((prev) => {
            const keys = key.split(".") // Split key into parts
            const newErrors: any = { ...prev }

            let current = newErrors
            for (let i = 0; i < keys.length; i++) {
                const k = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]) // Handle array indices
                if (i === keys.length - 1) {
                    current[k] = { ...current[k], _errors: error ? [error] : [] }
                } else {
                    current[k] = { ...current[k] } // Clone object for immutability
                    current = current[k]
                }
            }
            return newErrors
        })
    }

    return (
        <FormContext.Provider value={{ form, update, reset, clear, errors, setErrors, setError } as FormContextType<T>}>
            {children}
        </FormContext.Provider>
    )
}

export function useFormContext<T extends object>() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context as FormContextType<T>;
}