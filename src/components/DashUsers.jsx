'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { FaCheck, FaTimes } from 'react-icons/fa';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'; // import from your shadcn table component

export default function DashUsers() {
  const { user, isLoaded } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMongoId: user?.publicMetadata?.userMongoId,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user?.publicMetadata?.isAdmin) {
      fetchUsers();
    }
  }, [user?.publicMetadata?.isAdmin]);

  if (!user?.publicMetadata?.isAdmin && isLoaded) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full py-7'>
        <h1 className='text-2xl font-semibold'>You are not an admin!</h1>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto md:mx-auto p-3'>
      {user?.publicMetadata?.isAdmin && users.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date created</TableHead>
              <TableHead>User image</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>
                  {new Date(u.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <img
                    src={u.profilePicture}
                    alt={u.username}
                    className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                  />
                </TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  {u.isAdmin ? (
                    <FaCheck className='text-green-500' />
                  ) : (
                    <FaTimes className='text-red-500' />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>You have no users yet!</p>
      )}
    </div>
  );
}
