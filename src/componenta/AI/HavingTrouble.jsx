import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { GoogleGenerativeAI } from "@google/generative-ai";

const HavingTrouble = () => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCTQPhUL112U3cjo0xVp0y9PlnNQDammDM"
  );
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [finalResule, setFinalResult] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const { user } = useContext(AuthContext);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        const base64WithoutPrefix = base64String.split(",")[1];
        resolve(base64WithoutPrefix);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const imageParts = [
        {
          inlineData: {
            data: await fileToBase64(image),
            mimeType: image.type,
          },
        },
      ];
      const result = await model.generateContent([
        `Identify the vehicle issues described in the following message: "${message}". Based on the identified issues, provide a solution to resolve the problems effectively.`,
        ...imageParts,
      ]);

      const response = await result.response.text();
      setFinalResult(response);

      // Open the modal after setting the result
      setIsModalOpen(true);

      setImage(null);
      setMessage(null);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFinalResult("");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mt-8 shadow-lg">
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            <b>User Name</b>
          </h2>
          <input
            type="text"
            defaultValue={user?.displayName}
            name="name"
            placeholder="Write a Text Messages:"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            <b>Email Address</b>
          </h2>
          <input
            type="email"
            defaultValue={user?.email}
            name="email"
            placeholder="Email Address"
            required
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            <b>Date & Time</b>
          </h2>
          <input
            type="text"
            defaultValue={new Date().toString()}
            name="date"
            required
            placeholder="Email Address"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />
          <div className="flex flex-col items-center justify-center mt-5">
            <h1 className="text-3xl font-serif mb-2">Having Trouble</h1>
            {!image ? (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="flex items-center justify-center w-64 h-64 bg-gray-200 rounded-lg">
                    <span className="text-gray-500">Upload a plant image</span>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Uploaded plant"
                  className="w-64 h-64 object-contain mb-4"
                />
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold text-green-600 mb-4">
            <b>Write a Text Message:</b>
          </h2>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a Text Message:"
            className="border border-gray-300 rounded p-2 w-full mb-4"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-400 text-black rounded p-2 w-full mt-4"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Results</h2>
            <p className="mb-4">{finalResule}</p>
            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-400 text-white rounded p-2 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HavingTrouble;
