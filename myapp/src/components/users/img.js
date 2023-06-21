import React, { useEffect, useState } from 'react';

const ImageComponent = () => {
    const [imagePath, setImagePath] = useState('');
    const [fileNotFound, setFileNotFound] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:4200/image?path=${encodeURIComponent(imagePath)}`);

                if (response) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    console.log("img :- ",imageUrl)
                } else {
                    setFileNotFound(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchImage();
    }, [imagePath]);

    const handleInputChange = (e) => {
        setImagePath(e.target.value);
        setFileNotFound(false);
    };

    return (
        <div>
            <input type="text" value={imagePath} onChange={handleInputChange} />
            {fileNotFound && <p>File not found</p>}
        </div>
    );
};

export default ImageComponent;
