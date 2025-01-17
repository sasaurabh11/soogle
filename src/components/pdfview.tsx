"use client"
import { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const MyComponent = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    // Set the workerSrc to the location of the PDF.js worker
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.0.0/es5/build/pdf.worker.min.js`;
  }, []);

  const onLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="w-full h-full rounded-t-lg overflow-hidden shadow-lg">
      <Document
        file="/Saurabh_Resume.pdf" // Ensure this is located in the 'public' directory
        onLoadSuccess={onLoadSuccess}
        className="rpv-core__viewer--dark"
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg">
          Page {pageNumber} of {numPages ?? '--'}
        </span>

        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || 1))}
          disabled={pageNumber >= (numPages || 1)}
          className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
