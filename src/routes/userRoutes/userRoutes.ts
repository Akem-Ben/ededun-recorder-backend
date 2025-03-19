import express from 'express';
import { joiValidators } from '../../validations';
// import { userAuthController, userController } from '../../controllers';
import { generalAuthFunction } from '../../middlewares/authorization';
import { cloudinaryUtilities } from '../../utilities';

const router = express.Router();

//User Email Authentications and profile updates
// router.post(
//   '/email-signup',
//   joiValidators.inputValidator(joiValidators.userRegisterSchemaViaEmail),
//   userAuthController.userRegisterWithEmail,
// );

export default router;