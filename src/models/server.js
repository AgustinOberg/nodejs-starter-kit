import mongoose from 'mongoose';

const { Schema } = mongoose;

export const NAME_MAX_LENGTH = 20;
export const NAME_MIN_LENGTH = 3;

const ServerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: NAME_MIN_LENGTH,
      maxlength: NAME_MAX_LENGTH,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Server', ServerSchema);
