import { DataTypes } from "sequelize";
import { sequelize } from "../db/connect_db.mjs";

export const User = sequelize.define('User', {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            last_login: {
                type: DataTypes.DATE,
                defaultValue: Date.now
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            resetPasswordToken: DataTypes.STRING,
            resetPasswordExpiresAt: DataTypes.DATE,
            verificationToken: DataTypes.STRING,
            verificationTokenExpiresAt: DataTypes.DATE
        });

export default User;