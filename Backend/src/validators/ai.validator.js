const { z } = require("zod");

const reviewSchema = z.object({
    code: z
        .string()
        .min(1, "Code is required"),

    language: z
        .string()
        .min(1, "Language is required"),
});

module.exports = {
    reviewSchema,
};