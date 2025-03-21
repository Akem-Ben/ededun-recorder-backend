import { DataTypes, Model } from "sequelize";
import { database } from "../../configurations/database";
import {
  PhraseAttributes, PhraseCategory
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
    },
    pronounciation_note:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phrase_category: {
      type: DataTypes.ENUM(...Object.values(PhraseCategory)),
      defaultValue: PhraseCategory.Other,
    }
  },
  {
    sequelize: database,
    tableName: "Phrases",
  }
);

export default Phrases;