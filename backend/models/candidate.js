const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    residentialAddress: {
        street1: {
            type: String,
            required: true
        },
        street2: String
    },
    permanentAddress: {
        street1: String,
        street2: String
    },
    sameAsResidential: {
        type: Boolean,
        default: false
    },
    documents: [{
        fileName: {
            type: String,
            required: true
        },
        fileType: {
            type: String,
            required: true
        },
        filePath: {
            type: String,
            required: true
        }
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Candidate', candidateSchema);