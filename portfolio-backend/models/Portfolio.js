const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  // We will only have ONE document, so we can use a unique key
  // to find it easily.
  uniqueId: {
    type: String,
    default: 'myPortfolio',
    unique: true
  },
  about: {
    type: String,
    default: 'Write your about section here...'
  },
  contact: {
    email: { type: String, default: 'your-email@example.com' },
    phone: { type: String, default: 'Your Phone' },
    linkedin: { type: String, default: 'your-linkedin-url' },
    github: { type: String, default: 'your-github-url' }
  },
  skills: [
    {
      name: { type: String },
      // e.g., 'Intermediate', 'Advanced', or '80%'
      level: { type: String } 
    }
  ],
  projects: [
    {
      title: { type: String },
      description: { type: String },
      link: { type: String },
      image: { type: String } // URL to an image
    }
  ],
  education: [
    {
      degree: { type: String },
      school: { type: String },
      year: { type:String }
    }
  ]
}, {
  // Adds 'createdAt' and 'updatedAt' timestamps
  timestamps: true 
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);