'use client';

import { useUser } from '@clerk/nextjs';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { FileInput } from '@/components/ui/file-input';
import { Select } from '@/components/ui/select';
import { Input as TextInput } from '@/components/ui/input';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePostPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const router = useRouter();

  console.log(formData);

  // 🔹 Upload image to MongoDB (through /api/upload)
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      setImageUploadError(null);
      setImageUploadProgress(10);

      const form = new FormData();
      form.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: form,
      });

      if (!res.ok) {
        setImageUploadError('Image upload failed');
        setImageUploadProgress(null);
        return;
      }

      const data = await res.json();
      setFormData({ ...formData, image: data.imageUrl });
      setImageUploadProgress(100);
      setTimeout(() => setImageUploadProgress(null), 500);
    } catch (error) {
      console.error(error);
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
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

  if (isSignedIn && user.publicMetadata.isAdmin) {
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
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <Select
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="uncategorized">Select a category</option>
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
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                'Upload Image'
              )}
            </Button>
          </div>

          {/* Upload Errors */}
          {imageUploadError && (
            <Alert variant="destructive">{imageUploadError}</Alert>
          )}

          {/* Uploaded Image Preview */}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}

          {/* Content Editor */}
          <ReactQuill
            theme="snow"
            placeholder="Write something amazing..."
            className="h-72 mb-12"
            required
            onChange={(value) =>
              setFormData({ ...formData, content: value })
            }
          />

          <Button type="submit" variant="default">
            Publish
          </Button>

          {publishError && (
            <Alert variant="destructive">{publishError}</Alert>
          )}
        </form>
      </div>
    );
  } else {
    return (
      <h1 className="text-center text-3xl my-7 font-semibold">
        You are not authorized to view this page
      </h1>
    );
  }
}
