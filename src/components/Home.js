import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios'; 
import "./Home.css";

function Home() {
    const { userId } = useParams(); 
    const [username, setUsername] = useState(userId || ''); 
    const url = window.location.href + `/${username}`; 
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleDownloadQRCode = async () => {
        
        try {
            await axios.post('/api/saveData', { username });
            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
        
        const canvas = document.getElementById("qr-code-canvas");
        const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="homepage">
            <h1>Welcome, {userId || username}!</h1>
            <p>Scan the QR code below:</p>
            <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter Username"
            />
            <QRCode id="qr-code-canvas" value={url} />
            <button onClick={handleDownloadQRCode}>Download QR Code</button>
        </div>
    );
}

export default Home;
