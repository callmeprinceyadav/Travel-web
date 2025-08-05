import React, { useState, useEffect } from "react";
import { MdOutlineRefresh } from "react-icons/md";

const PaymentModal = ({ trip, onClose, onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [inputCaptcha, setInputCaptcha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captcha);
    setInputCaptcha("");
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNumberPattern = /^\d{16}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
    const cvvPattern = /^\d{3}$/;

    if (!cardNumber) newErrors.cardNumber = "Card Number is required.";
    else if (!cardNumberPattern.test(cardNumber))
      newErrors.cardNumber = "Card must be 16 digits.";

    if (!expiryDate) newErrors.expiryDate = "Expiry Date is required.";
    else if (!expiryDatePattern.test(expiryDate))
      newErrors.expiryDate = "Format MM/YYYY";

    if (!cvv) newErrors.cvv = "CVV is required.";
    else if (!cvvPattern.test(cvv)) newErrors.cvv = "3 digits only.";

    if (!inputCaptcha) newErrors.captcha = "CAPTCHA is required.";
    else if (inputCaptcha !== captcha) newErrors.captcha = "CAPTCHA does not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onPaymentSuccess(trip._id);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[3px] z-50 flex items-center justify-center px-3 sm:px-0 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-xl border border-yellow-100 rounded-3xl shadow-2xl w-full max-w-md p-7 md:p-9 glass-card relative transition-all duration-200">
        <button
          className="absolute right-4 top-3 text-xl text-gray-500 hover:text-red-500 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-500 mb-8 text-center tracking-tight">
          Payment Details
        </h2>

        {/* Card Number */}
        <div className="mb-5">
          <label className="block text-sm font-semibold mb-2 text-gray-600">
            Card Number
          </label>
          <input
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            maxLength={16}
            className={`w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 bg-white/70 outline-none transition-all duration-200 text-lg font-medium placeholder-gray-300 tracking-wider ${errors.cardNumber ? "border-red-400" : ""}`}
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
        </div>

        {/* Expiry/CVV */}
        <div className="flex gap-3 mb-5">
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-2 text-gray-600">
              Expiry Date
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={e => setExpiryDate(e.target.value.replace(/[^0-9/]/g, ""))}
              maxLength={7}
              className={`w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 bg-white/70 outline-none transition-all text-lg font-medium placeholder-gray-300 tracking-wide ${errors.expiryDate ? "border-red-400" : ""}`}
              placeholder="MM/YYYY"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
            )}
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-2 text-gray-600">
              CVV
            </label>
            <input
              type="password"
              value={cvv}
              onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
              maxLength={3}
              className={`w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 bg-white/70 outline-none transition-all text-lg font-medium placeholder-gray-300 tracking-widest ${errors.cvv ? "border-red-400" : ""}`}
              placeholder="123"
            />
            {errors.cvv && (
              <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Captcha */}
        <div className="mb-7">
          <label className="block text-sm font-semibold mb-2 text-gray-600">
            CAPTCHA
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div
              className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-400 to-yellow-300 text-white text-lg font-mono font-extrabold tracking-widest shadow-md select-none relative"
              style={{
                letterSpacing: "5px",
                textShadow: "1px 1px 8px rgba(0,0,0,0.2)",
                userSelect: "none"
              }}
            >
              {captcha}
              <button
                onClick={generateCaptcha}
                title="Refresh Captcha"
                className="ml-2 p-1 rounded-full bg-white/10 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <MdOutlineRefresh size={23} />
              </button>
            </div>
            <input
              type="text"
              value={inputCaptcha}
              onChange={e => setInputCaptcha(e.target.value)}
              className={`flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 bg-white/70 outline-none transition-all text-lg font-medium placeholder-gray-300 tracking-wide ${errors.captcha ? "border-red-400" : ""}`}
              placeholder="Enter CAPTCHA"
            />
          </div>
          {errors.captcha && (
            <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-5 py-2 text-base font-semibold rounded-full bg-gray-300/70 hover:bg-gray-400 text-gray-800 hover:text-white shadow focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            className={`px-6 py-2 text-base font-bold rounded-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 relative ${
              isLoading ? "opacity-60 pointer-events-none" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-yellow-200 border-t-yellow-800 rounded-full animate-spin"></span>
                Processing...
              </span>
            ) : (
              "Pay Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
