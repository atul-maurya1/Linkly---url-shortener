import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Modal from './Modal';
import Button from './Button';
import { Download, Copy, Check, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function QrCodeModal({ isOpen, onClose, link }) {
  const [copied, setCopied] = React.useState(false);
  const svgRef = useRef(null);
  const { addToast } = useApp();

  if (!link) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link.shortUrl);
    setCopied(true);
    addToast({
      type: 'success',
      title: 'Copied to Clipboard!',
      message: link.shortUrl
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQr = () => {
    try {
      const svg = svgRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = 1000;
        canvas.height = 1000;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 100, 100, 800, 800);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `linkly-qr-${link.shortCode}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
      addToast({
        type: 'success',
        title: 'QR Code Downloaded',
        message: 'High resolution PNG saved to your downloads.'
      });
    } catch (e) {
      addToast({
        type: 'error',
        title: 'Download Failed',
        message: 'Could not export QR code image.'
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code"
      description={`Shareable QR code for ${link.title}`}
      maxWidth="max-w-md"
    >
      <div className="flex flex-col items-center justify-center pt-2 pb-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
          <QRCodeSVG
            ref={svgRef}
            value={link.shortUrl}
            size={220}
            level="H"
            includeMargin={true}
            fgColor="#1e1b4b"
          />
        </div>

        <div className="mt-4 text-center max-w-sm">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 font-mono">
            {link.shortUrl}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
            Redirects to: {link.originalUrl}
          </p>
        </div>

        <div className="flex items-center gap-2 mt-6 w-full">
          <Button
            variant="outline"
            className="flex-1"
            icon={copied ? Check : Copy}
            onClick={handleCopy}
          >
            {copied ? 'Copied' : 'Copy URL'}
          </Button>

          <Button
            variant="primary"
            className="flex-1"
            icon={Download}
            onClick={downloadQr}
          >
            Download PNG
          </Button>
        </div>
      </div>
    </Modal>
  );
}
