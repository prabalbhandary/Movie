const { Schema, model, models } = require("mongoose")


const MovieSchema = new Schema({
    title: {
        type: String
    },
    slug: {
        type: String,
        required: true
    },
    bgposter: {
        type: String
    },
    smposter: {
        type: String
    },
    titlecategory: {
        type: String  
    },
    description: {
        type: String  
    },
    rating: {
        type: Number
    },
    duration: {
        type: String
    },
    year: {
        type: String
    },
    genre: [{
        type: String
    }],
    language: {
        type: String
    },
    subtitle: {
        type: String
    },
    size: {
        type: String
    },
    quality: {
        type: String
    },
    youtubelink: {
        type: String
    },
    category: {
        type: String
    },
    watchonline: {
        type: String
    },
    downloadlink: {
        "480p": {
            type: String
        },
        "720p": {
            type: String
        },
        "1080p": {
            type: String
        },
        "4k": {
            type: String
        }
    },
    status: {
        type: String
    }
}, {timestamps: true})

export const Movie = models.Movie || model("Movie", MovieSchema, 'movies')
