import bcrypt from 'bcryptjs'

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
}

export const comparePassword = async (userInputPassword,hashedPassword) => {
    const match = await bcrypt.compare(userInputPassword, hashedPassword);
    return match;
}