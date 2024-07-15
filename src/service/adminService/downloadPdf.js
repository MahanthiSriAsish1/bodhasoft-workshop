const downloadPDF = (pdfUrl, fileName) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  export default downloadPDF;