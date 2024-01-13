import React, { useState, useEffect } from 'react';


export default function StudentClassroom({ classroomData, setLara }) {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [filesData, setFilesData] = useState([]);

    const displayFile = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const fetchFilesData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/createstudentclassroom/${classroomData._id}`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setFilesData(data.pendingphoto || []); // Initialize with an empty array if data.pendingphoto is undefined
            } else {
                console.error('Failed to fetch files data');
            }
        } catch (error) {
            console.error('Error fetching files data:', error);
        }
    };

    useEffect(() => {
        // Fetch files data when the component mounts
        fetchFilesData();
    }, [classroomData._id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('text', text);

        try {
            const response = await fetch(`http://localhost:5000/createstudentclassroom/${classroomData._id}/uploadfile`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                console.log('File uploaded successfully');
                // Fetch and update files data after successful upload
                fetchFilesData();
            } else {
                console.error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };
    const handleDownload = (filename) => {
        // Create a link element
        const link = document.createElement('a');
        // Set the href attribute to the file URL
        link.href = `http://localhost:5000/${filename}`;
        // Specify that the link should be downloaded
        link.setAttribute('download', filename);
        // Append the link to the document
        document.body.appendChild(link);
        // Trigger a click on the link to start the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
    };
  

    return (
        <section className="full-table">
            {classroomData ? (
                <div className="table-header">
                    <div className="class-info-sec">
                        <div className="text">
                            <h2 className="topic-heading">{classroomData.cId}</h2>
                            <h2 className="topic">{classroomData.section}</h2>
                            <h2 className="topic">{classroomData.faculty}</h2>
                            
                        </div>
                        <div>
                           
                        </div>
                    </div>
                    {/* <div className="custom-file-upload">
                        <input type="file" name="file" id="file" onChange={displayFile} />
                        <button className="custom-button">Choose File</button>
                    </div> */}

                    {/* <form className="form-area" onSubmit={handleSubmit}>
                        <textarea
                            className="text-area"
                            placeholder="Write something..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <input className="class_btn_sb" type="submit" value="Submit" />
                    </form> */}
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {filesData && filesData.length > 0 && (
                <table className="import-table">
                    <thead className="import-table-header">
                        <tr>
                            <td className="text-size-bold">Content</td>
                            {/* <td className="text-size-bold">Text Input</td> */}
                            <td className="text-size-bold">Action</td>
                        </tr>
                    </thead>
                    <tbody className="import-table-item">
                        {filesData.map((fileData, index) => (
                            <tr key={index}>
                               <td>
                                    {fileData.filename.endsWith('.pdf') ? (
                                        // Display the filename for PDFs
                                        <div>
                                        <a href={`http://localhost:5000/${fileData.filename}`} target="_blank" rel="noopener noreferrer">
                                            {fileData.filename}
                                            
                                        </a>
                                        <p>{fileData.text}</p>
                                        </div>
                                        
                                    ) : fileData.filename.endsWith('.mp4') ? (
                                        // Display a video for .mp4 files
                                        <div>
                                            <video width="320" height="240" controls>
                                                <source src={`http://localhost:5000/${fileData.filename}`} type="video/mp4" />
                                            </video>
                                            {/* Display associated text for the video */}
                                            <p>{fileData.text}</p>
                                        </div>
                                    ) : (
                                        // Display an image for other file types
                                        <div>
                                            <img
                                                src={`http://localhost:5000/${fileData.filename}`}
                                                alt={`File ${index}`}
                                                style={{ maxWidth: '100px', maxHeight: '100px' }}
                                            />
                                            {/* Display associated text for the image */}
                                            <p>{fileData.text}</p>
                                        </div>
                                    )}
                                </td>
                                <td>
                        <button onClick={() => handleDownload(fileData.filename)}>Download</button>
                    </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}
