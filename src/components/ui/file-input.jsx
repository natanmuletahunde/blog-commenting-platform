'use client';

import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';

const FileInput = forwardRef(({ className, label, ...props }, ref) => {
  const [fileName, setFileName] = useState(null);

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <input
        type="file"
        ref={ref}
        onChange={handleChange}
        className={cn(
          'block w-full text-sm text-muted-foreground border border-input rounded-lg cursor-pointer bg-background file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90',
          className
        )}
        {...props}
      />
      {fileName && (
        <p className="mt-1 text-xs text-muted-foreground">
          Selected: {fileName}
        </p>
      )}
    </div>
  );
});

FileInput.displayName = 'FileInput';

export { FileInput };
