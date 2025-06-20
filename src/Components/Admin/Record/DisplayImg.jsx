'use client';
import React, { useState } from 'react';

const DisplayImg = () => {
  const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

   const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== 'image/tiff') {
      alert('Please upload a .tiff file');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tiff_upload'); // your unsigned preset
    formData.append('cloud_name', 'dysojgfi7'); // your Cloudinary cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dysojgfi7/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      const convertedUrl = data.secure_url.replace('/upload/', '/upload/f_png/');
      setImageUrl(convertedUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setLoading(false);
    }
}

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">Upload .TIFF File</label>
    <input
      type="file"
      accept=".tiff"
      onChange={handleFileChange}
      className="block w-full text-sm text-gray-600
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-primary file:text-white
        hover:file:bg-[#6355ff] transition"
    />
  </div>

  {imageUrl && (
    <div className="mt-4">
      <h4 className="font-semibold text-gray-700 mb-2">Preview:</h4>
      <img
        src={imageUrl}
        alt="Converted TIFF"
        className="w-full max-h-[500px] object-contain rounded-md border"
      />
    </div>
  )}
</div>

  );
};

export default DisplayImg;
