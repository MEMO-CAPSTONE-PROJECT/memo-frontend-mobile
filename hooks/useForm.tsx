import { useCallback, useState } from "react"

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


export default function useForm<T extends object>(initialValues: T) {
    const [form, setForm] = useState<T>(initialValues)

    const update = <K extends NestedKeyOf<T>>(key: K, value: NestedValue<T, K>) => {
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
        setForm((prev) => ({ ...prev, ...values }))
    }, [])

    return { form, update, reset }
}

