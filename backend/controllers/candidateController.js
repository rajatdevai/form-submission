const Candidate = require('../models/candidate');

exports.createCandidate = async (req, res) => {
    try {
        const { firstName, lastName, email, dateOfBirth, residentialAddress, 
                permanentAddress, sameAsResidential, documentsData } = req.body;

        
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age < 18) {
            return res.status(400).json({ 
                message: 'Candidate must be at least 18 years old' 
            });
        }

       
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ 
                message: 'At least 2 documents are required' 
            });
        }

        const documents = req.files.map((file, index) => {
            const docData = JSON.parse(documentsData)[index];
            return {
                fileName: docData.fileName,
                fileType: docData.fileType,
                filePath: file.path
            };
        });

        const candidateData = {
            firstName,
            lastName,
            email,
            dateOfBirth: dob,
            residentialAddress: JSON.parse(residentialAddress),
            sameAsResidential: sameAsResidential === 'true',
            documents
        };

        if (sameAsResidential !== 'true') {
            candidateData.permanentAddress = JSON.parse(permanentAddress);
        }

        const candidate = new Candidate(candidateData);
        await candidate.save();

        res.status(201).json({
            message: 'Candidate form submitted successfully',
            data: candidate
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Error submitting form', 
            error: error.message 
        });
    }
};

exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ submittedAt: -1 });
        res.status(200).json(candidates);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching candidates', 
            error: error.message 
        });
    }
};