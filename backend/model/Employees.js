import { model, Schema } from 'mongoose';

const Employees = new Schema({
  __id: Schema.Types.ObjectId,
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    default: '000-000-0000',
  },
  password: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
});

const EmployeesShema = model('Employees', Employees);

export default EmployeesShema;
