/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const { model, Schema, SchemaTypes } = require("mongoose");
require("mongoose-type-url");

const RobotSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: SchemaTypes.Url,
      require: true,
    },
    universe: {
      type: String,
      require: true,
    },
    sentient: {
      type: Boolean,
      require: true,
    },
    aperances: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Robot = model("Robot", RobotSchema, "robots");

module.exports = Robot;
