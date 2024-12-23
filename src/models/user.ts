import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User interface
interface IUser extends Document {
    username: string;
    password: string;

    // Method to hash the password
    hashPassword(password: string): Promise<string>;

    // Method to compare passwords
    matchPassword(enteredPassword: string): Promise<boolean>;
}

// Create the User schema
const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Method to hash the password
userSchema.methods.hashPassword = async function (password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
};

// Method to compare the entered password with the stored password
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
