import React, {Component} from 'react';

class DownloadPDF extends Component {

    downloadPDF = async () => {
        try {
            const uri = "http://localhost:8080/hello";
            let response = await fetch(uri);
            let data = await response.json();
            const {pdf} = data;
            const pdfByte = this.base64ToArrayBuffer(pdf);
            const blob = new Blob([pdfByte], { type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            this.generateDownloadLink(url, 'pdfku', 'pdfDownload');
        } catch (error) {
            console.error(error)
        }
    };

    generateDownloadLink = (url, name, linkId) => {
        const generatedElement = document.createElement('a');
        generatedElement.id = linkId;
        generatedElement.href = url;
        generatedElement.download = name;

        document.body.appendChild(generatedElement);
        generatedElement.click();

        setTimeout(() => {
            document.body.removeChild(generatedElement);
            window.URL.revokeObjectURL(url);
        }, 100);
    };

    base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i += 1) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }


    handleOnClick = () => {
        this.downloadPDF();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOnClick}>download</button>
            </div>
        );
    }
}

export default DownloadPDF;
