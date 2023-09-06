import { model, Schema } from 'mongoose';

const User = new Schema({
  __id: Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
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
  roles: {
    type: [String],
    default: 'USER',
  },
});

const UserSchema = model('User', User);
export default UserSchema;
