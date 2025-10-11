'use client';

import { useUser } from '@clerk/nextjs';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleImageUpload = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageUploadError('File size too large (max 5MB)');
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress(0);

      // Convert image to base64 for MongoDB storage
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadstart = () => {
          setImageUploadProgress(10);
        };

        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            setImageUploadProgress(Math.round(progress));
          }
        };

        reader.onload = (event) => {
          setImageUploadProgress(100);
          const base64Image = event.target.result;
          setFormData(prev => ({ ...prev, image: base64Image }));
          setImageUploadProgress(null);
          resolve(base64Image);
        };

        reader.onerror = () => {
          setImageUploadError('Failed to read image file');
          setImageUploadProgress(null);
          reject(new Error('Failed to read image file'));
        };

        reader.readAsDataURL(file);
      });

    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.error('Image upload error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setPublishError(null);

    try {
      // Validate required fields
      if (!formData.title || !formData.content) {
        setPublishError('Title and content are required');
        setIsSubmitting(false);
        return;
      }

      // If there's a file but it hasn't been uploaded yet, upload it first
      if (file && !formData.image) {
        await handleImageUpload();
      }

      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userMongoId: user.publicMetadata.userMongoId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message || 'Failed to create post');
        setIsSubmitting(false);
        return;
      }

      // Success - redirect to the new post
      setPublishError(null);
      router.push(`/post/${data.post.slug}`);

    } catch (error) {
      console.error('Error creating post:', error);
      setPublishError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setFile(null);
    setImageUploadError(null);
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.isAdmin === true ||
                  user?.publicMetadata?.isAdmin === "true";

  if (isSignedIn && isAdmin) {
    return (
      <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>
          Create a post
        </h1>

        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          {/* Title and Category */}
          <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput
              type='text'
              placeholder='Title'
              required
              id='title'
              className='flex-1'
              onChange={(e) =>
                setFormData(prev => ({ ...prev, title: e.target.value }))
              }
              value={formData.title || ''}
            />
            <Select
              onChange={(e) =>
                setFormData(prev => ({ ...prev, category: e.target.value }))
              }
              value={formData.category || 'uncategorized'}
            >
              <option value='uncategorized'>Select a category</option>
              <option value='javascript'>JavaScript</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='nodejs'>Node.js</option>
              <option value='mongodb'>MongoDB</option>
              <option value='webdev'>Web Development</option>
              <option value='programming'>Programming</option>
            </Select>
          </div>

          {/* Image Upload Section */}
          <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 rounded-lg'>
            <FileInput
              type='file'
              accept='image/*'
              onChange={(e) => {
                setFile(e.target.files[0]);
                setImageUploadError(null);
              }}
              disabled={imageUploadProgress}
            />
            <Button
              type='button'
              gradientDuoTone='purpleToBlue'
              size='sm'
              outline
              onClick={handleImageUpload}
              disabled={imageUploadProgress || !file}
            >
              {imageUploadProgress ? `Uploading... ${imageUploadProgress}%` : 'Upload Image'}
            </Button>
          </div>

          {imageUploadError && (
            <Alert color='failure'>{imageUploadError}</Alert>
          )}

          {formData.image && (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-green-600">✓ Image uploaded successfully!</p>
              <img
                src={formData.image}
                alt='Uploaded preview'
                className='w-full max-w-md h-72 object-cover rounded-lg shadow-md'
              />
              <Button
                type="button"
                color="failure"
                size="sm"
                onClick={handleRemoveImage}
              >
                Remove Image
              </Button>
            </div>
          )}

          {/* Rich Text Editor */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <ReactQuill
              theme='snow'
              placeholder='Write your post content here...'
              className='h-72 mb-4'
              value={formData.content || ''}
              onChange={(value) => {
                setFormData(prev => ({ ...prev, content: value }));
              }}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['blockquote', 'code-block'],
                  ['clean']
                ],
              }}
            />
          </div>

          {publishError && (
            <Alert color='failure'>{publishError}</Alert>
          )}

          <div className="flex gap-4">
            <Button
              type='submit'
              gradientDuoTone='purpleToPink'
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
            <Button
              type='button'
              color="light"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className='text-3xl font-semibold text-red-600 mb-4'>
            Access Denied
          </h1>
          <p className="text-gray-600">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }
}