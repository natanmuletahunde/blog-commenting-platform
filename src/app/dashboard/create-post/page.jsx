'use client';

import { useUser } from '@clerk/nextjs';
import { Alert } from '@/components/ui/alert';
import { FileInput } from '@/components/ui/file-input';
import { Select } from '@/components/ui/select';
import { Input as TextInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const router = useRouter();

  // 🔹 Upload image immediately on file selection
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', selectedFile);

    try {
      setImageUploading(true);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await res.json();
      if (data.imageUrl) {
        setFormData(prev => ({ ...prev, image: data.imageUrl }));
        setImageUploadError(null);
      } else {
        setImageUploadError('Upload failed');
        console.error('Upload failed:', data.message);
      }
    } catch (error) {
      console.error(error);
      setImageUploadError('Upload failed');
    } finally {
      setImageUploading(false);
    }
  };

  // 🔹 Submit post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userMongoId: user.publicMetadata.userMongoId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      setPublishError(null);
      router.push(`/post/${data.slug}`);
    } catch (error) {
      console.error(error);
      setPublishError('Something went wrong');
    }
  };

  if (!isLoaded) return null;

  if (!(isSignedIn && user.publicMetadata.isAdmin)) {
    return (
      <h1 className="text-center text-3xl my-7 font-semibold">
        You are not authorized to view this page
      </h1>
    );
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a Post
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title & Category */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData(prev => ({ ...prev, title: e.target.value }))
            }
          />

          {/* Updated Category Dropdown */}
          <Select
            className="flex-1 cursor-pointer border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
            value={formData.category || 'uncategorized'}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="uncategorized" disabled>
              Select a category
            </option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        {/* Image Upload */}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Upload Errors */}
        {imageUploadError && (
          <Alert variant="destructive">{imageUploadError}</Alert>
        )}

        {/* Uploaded Image Preview */}
        {formData.image && (
          <div className="w-full h-72 overflow-hidden border rounded-md">
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        {/* Content Editor */}
        <ReactQuill
          theme="snow"
          placeholder="Write something amazing..."
          className="h-72 mb-12"
          required
          onChange={(value) =>
            setFormData(prev => ({ ...prev, content: value }))
          }
        />

        <Button
          type="submit"
          className="bg-gradient-to-r from-teal-500 to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg hover:from-blue-500 hover:to-teal-500 transition-all duration-300"
          disabled={imageUploading}
        >
          {imageUploading ? 'Uploading Image...' : 'Publish Post'}
        </Button>

        {publishError && (
          <Alert variant="destructive">{publishError}</Alert>
        )}
      </form>
    </div>
  );
}
