import { model, Schema } from 'mongoose';

const Role = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const RoleSchema = model('Role', Role);
export default RoleSchema;
