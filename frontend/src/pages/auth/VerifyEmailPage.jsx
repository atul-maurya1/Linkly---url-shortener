import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import ThemeToggle from '../../components/common/ThemeToggle';
import { Link2, Mail, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useApp();
  const navigate = useNavigate();

  const handleChange = (val, idx) => {
    if (val.length > 1) val = val.slice(0, 1);
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    // Auto focus next input
    if (val && idx < 5) {
      const nextInput = document.getElementById(`digit-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVerified(true);
      addToast({
        type: 'success',
        title: 'Email Verified',
        message: 'Your email address has been verified successfully.'
      });
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      <div className="p-4 sm:p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <Link2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Linkly
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl text-center">
          {verified ? (
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Email Address Verified!
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your Linkly account is now fully activated.
              </p>
              <div className="pt-2">
                <Button variant="electric" className="w-full" onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400 mx-auto flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Verify your email
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
                Please enter the 6-digit confirmation code sent to your email address.
              </p>

              <form onSubmit={handleVerify} className="mt-6 space-y-5">
                <div className="flex justify-center gap-2">
                  {code.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`digit-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleChange(e.target.value, idx)}
                      className="w-11 h-12 text-center font-mono text-lg font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  variant="electric"
                  size="lg"
                  className="w-full"
                  loading={loading}
                >
                  Confirm Code
                </Button>
              </form>

              <div className="mt-6 text-xs text-slate-500">
                Didn't receive the email?{' '}
                <button
                  onClick={() =>
                    addToast({
                      type: 'info',
                      title: 'Code Resent',
                      message: 'A fresh verification email has been dispatched.'
                    })
                  }
                  className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                >
                  Resend code
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Linkly, Inc. All rights reserved.
      </div>
    </div>
  );
}
