import QRCode from 'qrcode.react';

const generateQRCode = (data) => {
  return <QRCode value={data} />;
};

export default generateQRCode;
