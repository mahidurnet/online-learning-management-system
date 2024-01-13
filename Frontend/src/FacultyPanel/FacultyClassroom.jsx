import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FacultyClassroom({ classroomData, setLara }) {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [filesData, setFilesData] = useState([]);
    const [selectedFileName, setSelectedFileName] = useState('');

    const displayFile = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);


        // Set the selected file name to state for display
        setSelectedFileName(selectedFile ? selectedFile.name : '');
    };

    const fetchFilesData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/createfacultyclassroom/${classroomData._id}/getfiles`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setFilesData(data.pendingphoto);
                console.log(filesData)
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
            const response = await fetch(`http://localhost:5000/createfacultyclassroom/${classroomData._id}/uploadfile`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('File uploaded successfully');
                // Fetch and update files data after successful upload
                fetchFilesData();
            } else {
                toast.success('Waiting for Admin Aprove');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file');
        }
    };


    const handleDeleteClick = (filename) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:5000/createfacultyclassroom/${classroomData._id}/deletefile/${filename}`, {
                        method: 'DELETE',
                        credentials: 'include',
                    });

                    if (response.ok) {
                        setFilesData((prevFiles) => prevFiles.filter((file) => file.filename !== filename));
                        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
                    } else {
                        console.error('Failed to delete file');
                    }
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }
        });
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
                            <h3 className="topic-code">{classroomData.code}</h3>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="custom-file-upload">
                        <label htmlFor="file" className="custom-button">
                            {selectedFileName ? selectedFileName : 'Choose File'}
                        </label>
                        <input
                            type="file"
                            id="file"
                            className="input-file"
                            onChange={displayFile}
                            style={{ display: 'none' }}
                        />
                        {selectedFileName && (
                            <button
                                className="clear-file"
                                onClick={() => setSelectedFileName('')}
                            >
                                &#x2715;
                            </button>
                        )}
                    </div>

                    <form className="form-area" onSubmit={handleSubmit}>
                        {/* <textarea
                            className="text-area"
                            placeholder="Write something..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea> */}

                        <input className="class_btn_sb" type="submit" value="Submit" />
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {filesData && filesData.length > 0 && (
                <table className="import-table">
                    <thead className="import-table-header">
                        <tr>
                            <td className="text-size-bold">Content</td>

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
                                <td className="actions-btn-group">
                                    <AiFillDelete className="delete-btn" onClick={() => handleDeleteClick(fileData.filename)} />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </section>
    );
}
