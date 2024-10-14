// src/components/FileUpload.js
import React, { useEffect, useState } from 'react';
import { storage, firestore } from '../firebase/firebaseConfig'; // Adjust based on your config file
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { QRCodeCanvas } from 'qrcode.react';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

const FileUpload = ({ user }) => {
  const [file, setFile] = useState(null);
  const [qrCodeData, setQrCodeData] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [filesList, setFilesList] = useState([]);

  // Fetch previously uploaded files on mount
  useEffect(() => {
    const fetchFiles = async () => {
      const q = query(collection(firestore, "files"), where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const files = [];
        querySnapshot.forEach((doc) => {
          files.push({ id: doc.id, ...doc.data() });
        });
        setFilesList(files); // Update the state with the fetched files
      });
      return () => unsubscribe(); // Cleanup listener on unmount
    };

    if (user) {
      fetchFiles(); // Fetch user files on login
    }
  }, [user]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
    setError(null);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const fileRef = ref(storage, `uploads/${file.name}`);
    try {
      await uploadBytes(fileRef, file); // Upload the file
      const downloadURL = await getDownloadURL(fileRef); // Get the download URL
      setQrCodeData(downloadURL); // Set QR code data to the file URL

      // Save file details to Firestore
      await addDoc(collection(firestore, "files"), {
        userId: user.uid,
        fileName: file.name,
        qrCodeUrl: downloadURL,
        timestamp: new Date()
      });

      setSuccess(true); // Indicate success
    } catch (error) {
      setError('Error uploading file: ' + error.message); // Handle error
    }
  };

  return (
    <div>
      <h2>Upload a File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>File uploaded successfully!</p>}
      
      {qrCodeData && (
        <div>
          <h2>Your QR Code:</h2>
          <QRCodeCanvas value={qrCodeData} size={256} level="H" />
        </div>
      )}

      <h2>Previously Uploaded Files:</h2>
      <ul>
        {filesList.map((file) => (
          <li key={file.id}>
            <a href={file.qrCodeUrl} target="_blank" rel="noopener noreferrer">
              {file.fileName}
            </a>
            <br />
            <QRCodeCanvas value={file.qrCodeUrl} size={128} level="H" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileUpload;
