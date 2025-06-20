const mongoose = require('mongoose');

const weeklyReportSchema = new mongoose.Schema(
  {
    cithCentreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CithCentre',
      required: true,
    },
    week: {
      type: Date,
      required: true,
    },
    eventType: {
      type: String,
      enum: ['regular_service', 'singles_day', 'youth_day', 'womens_day', 'mens_day', 'harvest', 'thanksgiving', 'special_crusade', 'baptism_service', 'communion_service', 'prayer_meeting', 'other'],
      default: 'regular_service',
    },
    eventDescription: {
      type: String,
      trim: true,
    },
    data: {
      male: {
        type: Number,
        required: true,
        min: 0,
      },
      female: {
        type: Number,
        required: true,
        min: 0,
      },
      children: {
        type: Number,
        required: true,
        min: 0,
      },
      offerings: {
        type: Number,
        required: true,
        min: 0,
      },
      numberOfTestimonies: {
        type: Number,
        required: true,
        min: 0,
      },
      numberOfFirstTimers: {
        type: Number,
        required: true,
        min: 0,
      },
      firstTimersFollowedUp: {
        type: Number,
        required: true,
        min: 0,
      },
      firstTimersConvertedToCITH: {
        type: Number,
        required: true,
        min: 0,
      },
      modeOfMeeting: {
        type: String,
        enum: ['physical', 'virtual', 'hybrid'],
        required: true,
      },
      remarks: {
        type: String,
        trim: true,
      },
    },
    status: {
      type: String,
      enum: ['pending', 'area_approved', 'zonal_approved', 'district_approved', 'rejected'],
      default: 'pending',
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    areaApprovedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  
    areaApprovedAt: Date,

    zonalApprovedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    zonalApprovedAt: Date,

    districtApprovedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    districtApprovedAt: Date,
    rejectionReason: String,
    rejectedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rejectedAt: Date,
  },
  {
    timestamps: true,
  }
);

// Allow multiple reports per centre per week if different events
weeklyReportSchema.index({ cithCentreId: 1, week: 1, eventType: 1 }, { unique: true });

module.exports = mongoose.model('WeeklyReport', weeklyReportSchema);