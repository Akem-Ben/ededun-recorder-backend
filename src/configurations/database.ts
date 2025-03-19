import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

dotenv.config()


export const database = new Sequelize(`${process.env.NEON}`,
    {
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
    }
)