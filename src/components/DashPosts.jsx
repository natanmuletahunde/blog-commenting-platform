'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Modal } from '@/components/ui/modal';

export default function DashPosts() {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user?.publicMetadata?.userMongoId,
          }),
        });
        const data = await res.json();
        if (res.ok) setUserPosts(data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [user?.publicMetadata?.userMongoId]);

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch('/api/post/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: postIdToDelete,
          userId: user?.publicMetadata?.userMongoId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserPosts(userPosts.filter((post) => post._id !== postIdToDelete));
        setPostIdToDelete('');
      } else console.log(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='min-h-screen p-8 bg-gradient-to-br from-blue-900 via-blue-700 to-black text-white'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Your Posts</h1>

      {userPosts.length > 0 ? (
        <div className='shadow-xl rounded-2xl overflow-hidden border border-gray-700 bg-gray-900 max-w-6xl mx-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date Updated</TableHead>
                <TableHead>Post Image</TableHead>
                <TableHead>Post Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Delete</TableHead>
                <TableHead>Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPosts.map((post) => (
                <TableRow key={post._id} className='hover:bg-blue-800 transition-colors'>
                  <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Link href={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-24 h-14 object-cover rounded-lg border border-blue-600'
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='font-semibold text-white hover:underline'
                      href={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell className='text-blue-400 font-medium'>
                    {post.category}
                  </TableCell>
                  <TableCell>
                    <span
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link
                      className='text-teal-400 hover:underline font-medium'
                      href={`/dashboard/update-post/${post._id}`}
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className='text-center mt-10 text-blue-200 text-lg'>
          You have no posts yet!
        </p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className='text-center p-4 bg-gray-900 text-white rounded-lg'>
          <HiOutlineExclamationCircle className='h-16 w-16 text-red-400 mb-4 mx-auto' />
          <h3 className='mb-5 text-lg font-medium'>
            Are you sure you want to delete this post?
          </h3>
          <div className='flex justify-center gap-4'>
            <Button variant='destructive' onClick={handleDeletePost}>
              Yes, I'm sure
            </Button>
            <Button variant='outline' onClick={() => setShowModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
