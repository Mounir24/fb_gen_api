const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment'); // DATE FORMATER

//START "PORTFOLIO" SCHEMA
const portfolioSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    client_id: { type: String, trim: true, required: true },
    avatar: { type: String, trim: true, required: true },
    template_color: { type: String, trim: true, required: true, default: '#111' },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true, required: true },
    template_type: { type: String, trim: true, required: true, default: "1" },
    website: { type: String, trim: true, required: true },
    profile_id: { type: String, trim: true, required: true },
    date_created: { type: String, default: moment().format('DD/MM/YYYY') }
}, { timestampes: true });

// EXPORT THE MODEL 
module.exports = mongoose.model('portfolios', portfolioSchema);
