import React, { useEffect, useState } from 'react';
let url


const ImageComponent = () => {
    const [imagePath, setImagePath] = useState('');
    const [fileNotFound, setFileNotFound] = useState(false);
    const [fileFound, setFileFound] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:4200/image?path=image/image-1687409356434-389637267.png`);
                if (response) {
                    const blob = await response.blob();
                    const imageUrl = URL.createObjectURL(blob);
                    url = response.url
                    console.log("url :- ",url)
                    setFileFound(true)
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
            {fileFound ? <img src={url} alt="" /> : <></>}
        </div>
    );
};

export default ImageComponent;
