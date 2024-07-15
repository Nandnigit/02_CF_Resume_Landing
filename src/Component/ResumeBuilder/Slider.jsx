// import React from 'react';
// import logo from './images/logo3.png';

// const Slider = ({
//   currentStep,
//   setCurrentStep,
//   isDetailsComplete,
//   isDetailsComplete2,
//   isDetailsComplete3,
//   isDetailsComplete4,
//   isDetailsComplete5,
//   isDetailsComplete6,
// }) => {
//   const sections = ['Heading', 'Work History', 'Education', 'Skills', 'Summary', 'Finalize'];
//   const progress = Math.floor(((currentStep + 1) / sections.length) * 100);

//   const completeness = [
//     isDetailsComplete(),
//     isDetailsComplete2(),
//     isDetailsComplete3(),
//     isDetailsComplete4(),
//     isDetailsComplete5(),
//     isDetailsComplete6(),
//   ];

//   const getClassNameForStep = (index) => {
//     let className =
//       'cursor-pointer text-lg rounded-full -  flex items-center justify-center ';
//     if (currentStep === index) {
//       className += 'text-blue-900 bg-white font-bold ';
//     } else {
//       className += 'hover:text-yellow-600 ';
//     }
//     if (completeness[index]) {
//       className += 'bg-white-500 text-blue'; // Mark as complete with green color
//     } else {
//       className += 'bg-blue-950 text-white'; // Default incomplete state
//     }
//     return className;
//   };

//   return (
//     <div className=" w-full h-20 pb-80 justify-center px-4" style={{ backgroundColor: '#333456', color: '#F2931C'}}>
//       <div className='pt-14 '>
//         <img src={logo}  className='w mb-10'style={{ width:'130px'}} alt="" />
//       </div>
//       <div className="px- py-3 flex ps-1">
//         <ul className="space-y-3 ">
//           {sections.map((section, index) => (
//             <li
//               key={index}
//               className={getClassNameForStep(index)}
//               onClick={() => setCurrentStep(index)}
//             >
//               <div className="relative">
//                 <div className={`rounded-full px-2 border-2  ${currentStep === index ? 'text-black ' : ''}`}>{index + 1}</div>
//                 {index !== sections.length - 1 && (
//                   <div className="h-3 w-px bg-white absolute top-8 left-1/2 transform -translate-x-1/2  "></div>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//         <ul className="space-y-5  ">
//           {sections.map((section, index) => (
//             <li
//               key={index}
//               className={`cursor-pointer align-middle px-2 text-sm font-semibold ${
//                 currentStep === index ? 'font-bold text-white text-base' : 'hover:text-yellow-500 text-white'
//               }`}
//               onClick={() => setCurrentStep(index)}
//             >
//               {section}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="px-2 mt-10 mb-40">
//         <p className="text-white mb-1 text-xs">RESUME PROGRESS {progress}%</p>
//         <div className="bg-white h-2 w-full rounded-full">
//           <div className="bg-blue-500  h-2 rounded-full" style={{ width: `${progress}%` }}></div>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default Slider;


import React from 'react';
import logo from './images/logo3.png';

const Slider = ({
  currentStep,
  setCurrentStep,
  isDetailsComplete,
  isDetailsComplete2,
  isDetailsComplete3,
  isDetailsComplete4,
  isDetailsComplete5,
  isDetailsComplete6,
}) => {
  const sections = ['Heading', 'Work History', 'Education', 'Skills', 'Summary', 'Finalize'];
  const progress = Math.floor(((currentStep + 1) / sections.length) * 100);

  const completeness = [
    isDetailsComplete(),
    isDetailsComplete2(),
    isDetailsComplete3(),
    isDetailsComplete4(),
    isDetailsComplete5(),
    isDetailsComplete6(),
  ];

  const getClassNameForStep = (index) => {
    let className = 'cursor-pointer text-lg rounded-full flex items-center justify-center ';
    if (currentStep === index) {
      className += 'text-blue-900 bg-white font-bold ';
    } else {
      className += 'hover:text-yellow-600 ';
    }
    if (completeness[index]) {
      className += 'bg-white-500 text-blue'; // Mark as complete with green color
    } else {
      className += 'bg-blue-950 text-white'; // Default incomplete state
    }
    return className;
  };

  return (
    <div className=" w-[203vh] h-16  justify-center px-4" style={{ backgroundColor: '#333456', color: '#F2931C' }}>
      <div className=' flex'>
      <div className=" mt-4">
        <img src={logo} className="w-32 " alt="Logo" />
      </div>
      <div className="flex justify-around text-xl w-full items-center align-middle space-x-4 ">
        {sections.map((section, index) => (
          <div key={index} className="flex gap-2 items-center justify-center align-middle">
            <div
              className={getClassNameForStep(index)}
              onClick={() => setCurrentStep(index)}
            >
              {/* <div className={`rounded-full px-1  border-2 ${currentStep === index ? 'text-black' : ''}`}>
                {index + 1}
              </div> */}
            </div>
            <div className={`cursor-pointer flex text-xl justify-center items-center align-middle px-3 font-semibold  mt-2 ${currentStep === index ? 'font-bold text-white shadow-md border-2 py-1 rounded-lg border-green-500 text-xl' : ' hover:text-gray-300 hover:rounded-md hover:border-b-4 hover:border-b-gray-500 text-gray-400'}`}
              onClick={() => setCurrentStep(index)}>
              {section}
            </div>
            {/* {index !== sections.length - 1 && (
              <div className="w-10 h-px bg-white my-4"></div>
            )} */}
          </div>
        ))}
      </div>
      <div className=" mt-2 mb-4 ">
        <p className="text-white mb-1 text-xs">RESUME PROGRESS {progress}%</p>
        <div className="bg-white h-2  rounded-full">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      </div>
      {/* <div className="px-4 mt-4 mb-4 w-full">
        <p className="text-black mb-1 text-xs">RESUME PROGRESS {progress}%</p>
        <div className="bg-white border-black h-2 w-40 rounded-full">
          <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div> */}
    </div>
  );
};

export default Slider;
