import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Container, TextField, FormControlLabel, Link, Checkbox, Button, Modal } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import logo from '../assets/cir_logo.png';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Signup() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharFile, setAadharFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAadharUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleFileUpload = (file) => {
    setAadharFile(file);
    setIsModalOpen(false);
  };

  const handleSignup = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('aadhar', aadharFile);

    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      navigate('/login');
    } else {
      alert('Signup failed!');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      handleFileUpload(acceptedFiles[0]);
    },
  });

  return (
    <div className="login-page" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100vh' }}>
      <Container component="main" maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box>
          <form noValidate autoComplete="off" style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" style={{ marginBottom: '10px', textAlign: 'left' }}>Get Started Now</Typography>
            <Typography variant="h6" style={{ marginBottom: '20px', textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Create your credentials to access your account
            </Typography>
            <Typography variant='h6' align='left' style={{ color: 'black', fontSize: '0.9rem', marginBottom: '0px' }}>Full Name</Typography>
            <TextField label="Name" value={name} onChange={handleNameChange} required variant="outlined" fullWidth margin="dense" style={{ marginBottom: '20px' }} />
            <Typography variant='h6' align='left' style={{ color: 'black', fontSize: '0.9rem', marginBottom: '0px' }}>Email address</Typography>
            <TextField label="Email" value={email} onChange={handleEmailChange} required variant="outlined" fullWidth margin="dense" style={{ marginBottom: '20px' }} />
            <Typography variant='h6' align='left' style={{ color: 'black', fontSize: '0.9rem', marginBottom: '0px' }}>Password</Typography>
            <TextField label="Password" value={password} onChange={handlePasswordChange} required variant="outlined" fullWidth margin="dense" type="password" style={{ marginBottom: '20px' }} />
            <FormControlLabel control={<Checkbox />} label="I agree to terms and policies" />
            <Button variant="contained" sx={{ width: '100%', margin: 2, alignSelf: 'center', backgroundColor: '#301C3B' }} type="button" onClick={handleAadharUploadClick}>Upload Aadhar</Button>
            <Button variant="contained" onClick={handleSignup} sx={{ width: '100%', margin: 2, alignSelf: 'center', backgroundColor: '#59B6B1' }} type="button">Sign Up</Button>
            <Typography variant='h6' align='center' style={{ color: 'black', fontSize: '0.9rem', marginBottom: '0px' }}>Already have an account?  
              <Link component="button" onClick={() => navigate('/login')} style={{ color: 'blue', marginLeft: '3px' }}>Login</Link>
            </Typography>
          </form>
        </Box>
      </Container>

      <div className="login-page-image" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">Upload Aadhar</Typography>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed #000',
              padding: '20px',
              marginTop: '20px',
              textAlign: 'center',
            }}
          >
            <input {...getInputProps()} />
            <Typography>Drag & drop a file here, or click to select a file</Typography>
          </Box>
          <Button onClick={() => setIsModalOpen(false)} sx={{ marginTop: '20px' }}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}
