'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../components/forms/Input';
import Spinner from '../../components/common/Spinner';
import { useAuthContext } from '../../contexts/AuthContext';
import { FaUser } from "react-icons/fa";
import { PiHandWavingLight } from "react-icons/pi";

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(75); // 1:15 minutes

  const router = useRouter();
  const { login, getProfile } = useAuthContext();

  useEffect(() => {
    let timer: any;
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setResendDisabled(false);
    }

    return () => clearInterval(timer);
  }, [resendDisabled, countdown]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/send-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      if (!res.ok) throw new Error('ارسال کد با خطا مواجه شد');

      setStep(2);
      setResendDisabled(true);
      setCountdown(75);
    } catch (err: any) {
      setError(err.message || 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: phoneNumber,
          code: code,
        }),
        credentials: 'include',
      });

      if (!res.ok) throw new Error('کد نادرست است یا خطا در تأیید');

      const data = await res.json();
      const { access, refresh } = data;
      
      if (data.slug) {
        login(access, refresh);
        await getProfile(access);
        router.push(`/couples/${data.slug}`);
      } else {
        router.push(`/couples/register`);
      }
    } catch (err: any) {
      setError(err.message || 'تأیید ناموفق بود');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/send-code/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phoneNumber }),
      });

      if (!res.ok) throw new Error('ارسال مجدد با خطا مواجه شد');

      setResendDisabled(true);
      setCountdown(75);
    } catch (err: any) {
      setError(err.message || 'خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] flex md:items-center items-end justify-center bg-cover bg-center" style={{ backgroundImage: `url(/couple3.png)` }} dir="rtl">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
          <Spinner size="w-12 h-12" />
        </div>
      )}

      <div className="md:w-3/5 md:block hidden p-10 text-white">
        <div className="flex items-center justify-start mb-4">
          <h1 className="text-4xl font-bold ml-4">سلام، خوش آمدید!!!</h1>
          <PiHandWavingLight className="text-6xl animate-wave origin-bottom-right" />
        </div>
        <p className="text-lg font-medium mb-4">برای ورود کد تایید را وارد کنید.</p>
      </div>

      <div className="flex flex-col bg-white rounded-3xl shadow-lg max-w-md w-full p-10">
        <div className="flex items-center justify-center mb-6">
          <FaUser className="text-3xl" />
          <h2 className="text-3xl font-semibold text-gray-900 mr-2">ورود</h2>
        </div>

        <form onSubmit={step === 1 ? handleSendCode : handleVerifyCode}>
          <Input
            label="شماره تلفن"
            name="phoneNumber"
            type="tel"  // Add type="tel" for better mobile support
            pattern="^09\d{9}$"  // Remove one backslash
            title="لطفاً شماره موبایل معتبر وارد کنید (مثال: 09123456789)"
            value={phoneNumber}
            onChange={(e) => {
              // Ensure only numbers are entered
              const value = e.target.value.replace(/\D/g, '');
              setPhoneNumber(value);
            }}
            required
            disabled={step === 2}
          />

          <Input
            label="کد تایید"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            disabled={step === 1}
          />

          {step === 2 && (
            <div className="flex justify-between items-center mt-2 mb-4">
              <button
                type="button"
                className={`text-sm ${resendDisabled ? 'text-gray-400' : 'text-indigo-600'} hover:underline`}
                onClick={handleResendCode}
                disabled={resendDisabled}
              >
                {resendDisabled ? `ارسال مجدد (${countdown})` : 'ارسال مجدد کد'}
              </button>
            </div>
          )}

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 mt-6"
          >
            {step === 1 ? 'دریافت کد' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  );
}
