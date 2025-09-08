
export function setSearchParams(params: { [key: string]: string | number | boolean }) {
    const searchParams = new URLSearchParams()
    for (const key in params) {
        const value = params[key as keyof typeof params]
        if (value) searchParams.set(key, value.toString())
    }
    return searchParams
}