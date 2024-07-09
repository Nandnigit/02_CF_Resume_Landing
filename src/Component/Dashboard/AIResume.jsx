import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AIResume() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accuracyPercentage, setAccuracyPercentage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading1] = useState(false);
  const [error, setError] = useState(null);

  const [editableResumeName, setEditableResumeName] = useState('Resume1');
  const [note, setNote] = useState('');
  const [hasLink, setHasLink] = useState(false);

  const handleNoteChange = (e) => {
    const value = e.target.value;
    setNote(value);

    const linkPattern = /(https?:\/\/[^\s]+)/g;
    setHasLink(linkPattern.test(value));
  };

  

const handleClick = async () => {
  const token = localStorage.getItem('token'); // Adjust according to your token storage method
  console.log("token",token);
  if (!token) {
    setError('User not logged in');
    return;
  }

  setIsOpen(!isOpen);

  if (!isOpen) {
    setLoading1(true);
    try {
      const response = await axios.post('https://api.abroadium.com/api/jobseeker/resume-improved', {
        headers: {
          Authorization: `${token}`,
        },
      });
      setData(response.data);
      console.log("response", response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading1(false);
    }
  }
};


  const resumeScore = async () => {
    try {
      setLoading(true); // Set loading to true when the API call starts
      const token = localStorage.getItem('token'); // Retrieve the token from local storage
      const requestBody = {
        keyword: "Rate this resume content in percentage ? and checklist of scope improvements in manner of content and informations",
        file_location: "/etc/ai_job_portal/jobseeker/resume_uploads/black-and-white-standard-professional-resume-1719321080.pdf"
      };
  
      const response = await axios.post(
        'https://api.abroadium.com/api/jobseeker/file-based-ai',
        requestBody,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
  
      // Extract only the content_acuracy_percentage from the response
      const { content_acuracy_percentage } = response.data.data;
      setAccuracyPercentage(content_acuracy_percentage);
    } catch (error) {
      console.error('Error fetching data from API', error);
      // Add user-friendly error handling or notifications here
    } finally {
      setLoading(false); // Set loading to false when the API call completes
    }
  };

  return (
    <>
      <div className='bg-gray-800 w-full px-5'>
        <div className='mt-20'>
          <div className='flex items-center md:gap-10'>
            <h1 className='font-bold text-4xl py-8 text-white'>Resume Builder</h1>
            <Link to='/resumebuilder'>
              <div className='flex justify-center mt-2'>
                <button className='px-3 py-3 font-bold rounded-xl bg-slate-300 text-black'>Build your Resume Now</button>
              </div>
            </Link>
          </div>

          <table className='border-2 border-white w-full text-white  text-lg'>
            <thead>
              <tr className='border-2 border-white'>
                <th className='border-2 border-white px-2 py-1'>Resume</th>
                <th className='border-2 border-white px-2 py-1'>Resume Score</th>
                <th className='border-2 border-white px-2 py-1'>Improve with AI</th>
                
                <th className='border-2 border-white px-2 py-1'>Created</th>
                <th className='border-2 border-white px-2 py-1'>Actions</th>
                <th className='border-2 border-white px-2 py-1'>Add JD Link</th>
                <th className='border-2 border-white px-2 py-1'>JD Match %</th>
              </tr>
            </thead>
            <tbody >
              <tr className='border-2 border-white'>
                <td className='border-2 border-white text-center w-2'>
                  <input
                    type='text'
                    value={editableResumeName}
                    onChange={(e) => setEditableResumeName(e.target.value)}
                    className='bg-gray-800 text-white text-center px-1 py-1 rounded-md w-32'
                  />
                </td>
                <td className='border-2 border-white px-4'>
                  {loading ? (
                    <div className='text-white font-semibold px-3 py-3'>Loading...</div> // Display loading indicator
                  ) : accuracyPercentage !== null ? (
                    <div className='api-data-container'>
                      <p className='text-white font-semibold px-3 py-3'>AI Score: {accuracyPercentage}</p>
                    </div>
                  ) : (
                    <button
                      type='button'
                      // onClick={resumeScore}
                      className='text-white hover:text-violet-950 px-1 py-1 bg-yellow-500 rounded-md text-lg font-semibold flex align-middle justify-center  items-center'
                    >
                      Score
                    </button>
                  )}
                </td>
                <td className='border-2 border-white px-4 text-center'>
                  <div className='relative'>
                    <div
                      className='text-white hover:text-black px-1 py-1 items-center rounded-md text-base font-bold bg-yellow-500 cursor-pointer'
                      onClick={handleClick}
                    >
                      AI
                    </div>
                    {isOpen && (
                      <div className='absolute top-full mt-2 w-64 bg-white shadow-lg rounded-md p-4'>
                        {isLoading ? (
                          <div>Please wait for while...</div>
                        ) : error ? (
                          <div className='text-red-500'></div>
                        ) : (
                          <ul>
                            {Array.isArray(data) && data.length > 0 ? (
                              data.map((item, index) => (
                                <li key={index} className='py-1'>
                                  {item.name} {/* Adjust according to your data structure */}
                                </li>
                              ))
                            ) : (
                              <div>Please wait for while.....</div>
                            )}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                
                <td className='border-2 border-white px-4'>02/07/2024</td>
                <td className='border-2 border-white px-2'>
                <Link to='/uploadresume'>
                  <i className='fa-solid fa-upload px-1'></i>
                  </Link>
                  <Link to='/uploadresume'>
                  <i className='fa-solid fa-pen-to-square px-1'></i>
                  </Link>
                  
                  <button className=' px-2 py-1 rounded-lg font-semibold bg-yellow-500'>View</button>
                </td>
                <td className='border-2 border-white px-2'>
                  <textarea
                    value={note}
                    onChange={handleNoteChange}
                    className='bg-gray-800 text-white px-2 py-1 rounded-md w-full'
                    rows='2'
                  />
                  {hasLink && (
        <button className='bg-yellow-500 text-white px-2 py-1 rounded-md mt-2'>
          Match
        </button>
      )}
                </td>
              </tr>
              


              <tr className='border-2 border-white'>
                <td className='border-2 border-white text-center px-1'>
                 Resume2
                </td>
                <td className='border-2 border-white px-4'>
                <button
                      type='button'
                      
                      className='text-white hover:text-violet-950 px-1 py-1 bg-yellow-500 rounded-md text-lg font-semibold flex align-middle justify-center  items-center'
                    >
                      Score
                    </button>
                </td>
                <td className='border-2 border-white px-4 text-center'>
                  <div className='relative'>
                    <div
                      className='text-white hover:text-black px-1 py-1  items-center rounded-md text-base font-bold bg-yellow-500 cursor-pointer'
                      onClick={handleClick}
                    >
                      AI
                    </div>
                    {isOpen && (
                      <div className='absolute top-full mt-2 w-64 bg-white shadow-lg rounded-md p-4'>
                        {isLoading ? (
                          <div>Please wait for while...</div>
                        ) : error ? (
                          <div className='text-red-500'></div>
                        ) : (
                          <ul>
                            {Array.isArray(data) && data.length > 0 ? (
                              data.map((item, index) => (
                                <li key={index} className='py-1'>
                                  {item.name} {/* Adjust according to your data structure */}
                                </li>
                              ))
                            ) : (
                              <div>Please wait for while.....</div>
                            )}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                
                <td className='border-2 border-white px-4'>02/07/2024</td>
                <td className='border-2 border-white px-2'>
                  <Link to='/uploadresume'>
                  <i className='fa-solid fa-upload px-1'></i>
                  </Link>
                  
                  <Link to='/uploadresume'>
                  <i className='fa-solid fa-pen-to-square px-1'></i>
                  </Link>
                  
                  <button className=' px-2 py-1 rounded-lg font-semibold bg-yellow-500'>View</button>
                </td>
                <td className='border-2 border-white px-2'>
                <textarea
                    value={note}
                    onChange={handleNoteChange}
                    className='bg-gray-800 text-white px-2 py-1 rounded-md w-full'
                    rows='2'
                  />
                  {hasLink && (
        <button className='bg-yellow-500 text-white px-2 py-1 rounded-md mt-2'>
          Match
        </button>
      )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AIResume;
