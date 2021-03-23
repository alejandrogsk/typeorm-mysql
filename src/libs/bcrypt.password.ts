import bcrypt from "bcrypt";
export const encriptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const encriptedPassword = await bcrypt.hash(password, salt)
    return encriptedPassword
}

export const validatePassword = async(password: string, encriptedPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, encriptedPassword)

    return result
}