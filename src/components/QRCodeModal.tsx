import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type {Point, QRCodeData} from "../utils/types.ts";
import QRCode from "react-qr-code";
type QRCodeModalProps = {
    isOpen: boolean;
    onClose: () => void;
    userPoints: Point[]
};

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, userPoints }) => {
    const [routeName, setRouteName] = useState('');
    const [mounted, setMounted] = useState(false);
    const [isInputTouched, setIsInputTouched] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);

    // Vérification de l'input
    const isInputEmpty = routeName.trim() === '';

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Reset des valeurs quand la modale est fermée
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setRouteName('');
                setIsInputTouched(false);
                setShowQRCode(false);
            }, 300); // Délai pour attendre que la modale soit bien fermée
        }
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const handleGenerate = () => {
        // Vérifie qu'un nom soit donné pour générer le QRcode
        if (!isInputEmpty) {
            setShowQRCode(true);
        }
    };

    const convertedPoints = userPoints.map(point => ({
        lat: point.latitude,
        lon: point.longitude
    }));

    const qrData: QRCodeData = {
        name: routeName,
        route: convertedPoints
    };

    const serializedQRCode = JSON.stringify(qrData);

    const handleClose = () => {
        onClose();
    };

    const handleInputBlur = () => {
        setIsInputTouched(true);
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Overlay with backdrop */}
            <div
                className="fixed inset-0 bg-black/30 transition-opacity"
                onClick={handleClose}
            />

            {/* Modal content */}
            <div className="bg-white rounded-2xl shadow-xl z-[10000] max-w-md w-full mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center border-b p-4">
                    <h3 className="text-xl font-semibold text-gray-800">QR Code de l'itinéraire</h3>
                    <button
                        onClick={handleClose}
                        className="p-1 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col items-center">
                    {/* Input field for route name */}
                    <div className="w-full mb-6">
                        <label htmlFor="routeName" className="block text-sm font-medium text-gray-700 mb-1">
                            Nom de l'itinéraire
                        </label>
                        <input
                            type="text"
                            id="routeName"
                            value={routeName}
                            onChange={(e) => setRouteName(e.target.value)}
                            onBlur={handleInputBlur}
                            placeholder="Mon itinéraire"
                            disabled={showQRCode}
                            className={`w-full px-4 py-2 border rounded-lg text-black transition-colors ${
                                isInputEmpty && isInputTouched
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                            } ${showQRCode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        />
                        {isInputEmpty && isInputTouched && (
                            <p className="mt-1 text-sm text-red-500">
                                Veuillez entrer un nom d'itinéraire
                            </p>
                        )}
                    </div>

                    <div className="bg-gray-100 w-64 h-64 flex items-center justify-center mb-4 rounded-l overflow-hidden">
                        {showQRCode ? (
                            <QRCode value={serializedQRCode} size={260} />
                        ) : (
                            <p className="text-gray-500 text-center p-4">QR Code sera généré ici</p>
                        )}
                    </div>
                    <p className="text-gray-600 text-center">
                        Scannez ce QR code pour partager votre itinéraire
                    </p>
                </div>

                {/* Footer */}
                <div className="border-t p-4 flex justify-end gap-2">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleGenerate}
                        disabled={isInputEmpty}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            isInputEmpty
                                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                                : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                    >
                        Générer
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default QRCodeModal;