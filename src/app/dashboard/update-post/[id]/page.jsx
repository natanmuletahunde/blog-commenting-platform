'use client';

import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Alert } from '@/components/ui/alert';
import { FileInput } from '@/components/ui/file-input';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function UpdatePost() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [publishError, setPublishError] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const postId = pathname.split('/').pop();

  // Fetch post data from MongoDB
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId }),
        });
        const data = await res.json();
        if (res.ok) setFormData(data.posts[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (isSignedIn && user?.publicMetadata?.isAdmin) fetchPost();
  }, [postId, user?.publicMetadata?.isAdmin, isSignedIn]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          imageUrl = reader.result;
          await updatePost(imageUrl);
        };
      } else {
        await updatePost(imageUrl);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const updatePost = async (imageUrl) => {
    try {
      const res = await fetch('/api/post/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          userMongoId: user.publicMetadata.userMongoId,
          postId,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      router.push(`/post/${data.slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  if (!isLoaded) return null;

  if (!isSignedIn || !user?.publicMetadata?.isAdmin) {
    return (
      <h1 className='text-center text-3xl my-7 font-semibold min-h-screen'>
        You need to be an admin to update a post
      </h1>
    );
  }

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a Post</h1>

      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        {/* Title + Category */}
        <div className='flex flex-col sm:flex-row gap-4'>
          <Input
            placeholder='Title'
            required
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className='flex-1'
          />

          {/* Fixed Select using proper structure */}
          <Select
            value={formData.category || 'uncategorized'}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='uncategorized'>Select a category</SelectItem>
              <SelectItem value='javascript'>JavaScript</SelectItem>
              <SelectItem value='reactjs'>React.js</SelectItem>
              <SelectItem value='nextjs'>Next.js</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* File Upload */}
        <div className='flex gap-4 items-center justify-between border-4 border-dotted border-teal-500 p-3 rounded-lg'>
          <FileInput
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span className='text-sm text-gray-500'>Optional: choose a new image</span>
        </div>

        {/* Preview */}
        {(formData.image || file) && (
          <img
            src={file ? URL.createObjectURL(file) : formData.image}
            alt='preview'
            className='w-full h-72 object-cover rounded-md'
          />
        )}

        {/* React Quill Editor */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          value={formData.content || ''}
          onChange={(value) => setFormData({ ...formData, content: value })}
          className='h-72 mb-12'
        />

        {/* Submit Button */}
        <Button type='submit' variant='primary'>
          Update
        </Button>

        {/* Publish Error */}
        {publishError && <Alert variant='destructive'>{publishError}</Alert>}
      </form>
    </div>
  );
}
