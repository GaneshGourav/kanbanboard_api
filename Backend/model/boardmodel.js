const mongoose = require("mongoose");

const kanbanboardSchema = mongoose.Schema({
  name: { type: String, required: true },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
  row: [
    {
      name: { type: String, required: true },
      task: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          status: { type: String, enum: ["Todo", "Doing", "Done"] },
          default: "Todo",
        },
      ],
    },
  ],
});

const BoardModel = mongoose.model("Board", kanbanboardSchema);
module.exports = { BoardModel };
