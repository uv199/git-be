import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const likeSchema = mongoose.Schema(
  {
    owner: {
      type: String,
      required: [true, "Please provide owner name"],
    },
    repoName: {
      type: String,
      required: [true, "Please provide repo name"],
    },
    description: String,

    repoId: {
      type: Number,
      required: [true, "Please provide repoId"],
    },
    url: {
      type: String,
      required: [true, "Please provide repo link"],
    },

    userId: {
      type: ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export const StarRepo = mongoose.model("starRepo", likeSchema);
