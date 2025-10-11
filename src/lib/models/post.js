import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'uncategorized',
  },
  image: {
    type: String, // This will store base64 image data
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  authorName: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

// Create slug from title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }
  next();
});

// Check if model already exists to prevent OverwriteModelError
export default mongoose.models.Post || mongoose.model('Post', postSchema);