const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        code: {
            type: String,
            required: true,
        },

        language: {
            type: String,
            required: true,
        },

        review: {
            summary: {
                type: String,
                required: true,
            },

            score: {
                overall: {
                    type: Number,
                    required: true,
                },

                readability: {
                    type: Number,
                    required: true,
                },

                performance: {
                    type: Number,
                    required: true,
                },

                security: {
                    type: Number,
                    required: true,
                },

                maintainability: {
                    type: Number,
                    required: true,
                },
            },

            strengths: {
                type: [String],
                required: true,
            },

            weaknesses: {
                type: [String],
                required: true,
            },

            improvedCode: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Review", reviewSchema);