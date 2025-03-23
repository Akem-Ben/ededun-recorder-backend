import {Sequelize} from 'sequelize';

const stage: any = process.env.NODE_ENV;
let NEON

if(stage === "development"){
    NEON = process.env.DEV_DB
}else if(stage === "production"){
    NEON = process.env.PROD_DB
}

export const database = new Sequelize(`${NEON}`,
    {
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
    }
)