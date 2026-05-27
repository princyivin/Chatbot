import { useRef, useState } from "react";

const FileUpload = () => {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);

  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);

    const updatedFiles = fileArray.map((file) => ({
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
    }));

    setFiles((prev) => [...prev, ...updatedFiles]);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    const updated = [...files];

    updated.splice(index, 1);

    setFiles(updated);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-4 md:p-6 pt-24 md:pt-6">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          File Upload
        </h1>

        <p className="text-gray-400 mt-2">
          Upload images, documents, and project files.
        </p>
      </div>

      {/* UPLOAD BOX */}
      <div
        onClick={() => inputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-purple-500/40 rounded-3xl p-14 text-center cursor-pointer bg-white/5 hover:bg-white/[0.07] transition"
      >

        <div className="text-7xl mb-6">
          📁
        </div>

        <h2 className="text-3xl font-bold mb-3">
          Drag & Drop Files
        </h2>

        <p className="text-gray-400">
          or click to browse from your device
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={handleInputChange}
        />

      </div>

      {/* FILE PREVIEW */}
      {files.length > 0 && (
        <div className="mt-10">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold">
              Uploaded Files
            </h2>

            <span className="text-gray-400">
              {files.length} files
            </span>

          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {files.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl"
              >

                {/* IMAGE PREVIEW */}
                {item.preview ? (
                  <img
                    src={item.preview}
                    alt="preview"
                    className="w-full h-52 object-cover"
                  />
                ) : (
                  <div className="h-52 flex items-center justify-center text-7xl bg-[#111827]">
                    📄
                  </div>
                )}

                {/* FILE INFO */}
                <div className="p-5">

                  <h3 className="font-semibold text-lg truncate">
                    {item.file.name}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2">
                    {(item.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {/* ACTIONS */}
                  <div className="flex gap-3 mt-5">

                    <button className="flex-1 bg-purple-500 py-3 rounded-2xl hover:scale-105 transition">
                      Upload
                    </button>

                    <button
                      onClick={() => removeFile(index)}
                      className="px-5 bg-red-500/20 border border-red-500/20 rounded-2xl hover:bg-red-500/30 transition"
                    >
                      ❌
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* EMPTY STATE */}
      {files.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24">

          <div className="text-8xl mb-6">
            ☁️
          </div>

          <h2 className="text-3xl font-bold">
            No Files Uploaded
          </h2>

          <p className="text-gray-400 mt-3">
            Upload files to see previews here.
          </p>

        </div>
      )}

    </div>
  );
};

export default FileUpload;