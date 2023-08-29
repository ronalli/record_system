import { model, Schema } from 'mongoose';

const User = new Schema({
  __id: Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  passwordHash: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  token: {
    type: String,
  },
});

const UserSchema = model('User', User);
export default UserSchema;
