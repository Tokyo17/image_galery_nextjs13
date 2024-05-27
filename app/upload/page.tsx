"use client"

import { ChangeEvent, useState } from "react";
import useApi from "../useApi";

const Upload = () => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [caption, setCaption] = useState<string>("");

  const selectedImageHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const {uploadHandler}=useApi()
  return (
    <div className="form">
      <div className="w-[250px] overflow-x-hidden text-ellipsis whitespace-nowrap text-center">{imageFile?.name}</div>
      <input id="inputGambar" type="file" accept="image/*" onChange={selectedImageHandler} />
      <label htmlFor="inputGambar" className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded">
        Choose File
      </label>
      <textarea
        maxLength={70}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write short caption..."
        className="border-2 p-4 border-gray-200 focus:outline-none focus:bg-white focus:border-sky-300"
      />
      <button
        onClick={() => {
          uploadHandler(imageFile, caption);
        }}
        className="my-2 bg-transparent hover:bg-sky-300 text-sky-500 font-semibold hover:text-white py-2 px-4 border border-sky-300 hover:border-transparent rounded"
      >
        Upload
      </button>
    </div>
  );
}

export default Upload