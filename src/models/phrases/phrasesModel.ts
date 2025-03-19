import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/database";
import {
  PhraseAttributes
} from "../../types/modelTypes";

export class Phrases extends Model<PhraseAttributes> {}

Phrases.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },

    english_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    yoruba_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  {
    sequelize: database,
    tableName: "Phrases",
  }
);

export default Phrases;