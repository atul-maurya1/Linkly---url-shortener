import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import ThemeToggle from '../../components/common/ThemeToggle';
import { Link2, Eye, EyeOff, ArrowRight } from 'lucide-react';
import {AuthContext} from "../../context/AuthContext"

export default function RegisterPage() {

  const {
    registerUser,
    error,
    setError,
    isLoading,
    userVerify
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
 // const [isLoading, setIsLoading] = useState(false);
  const verificationInputs = useRef([]);
  const [isOtpStep, setIsOtpStep] = useState(false);

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    if (isOtpStep) {
      verificationInputs.current[0]?.focus();
    }
  }, [isOtpStep]);

  // Password strength calculation
  const getPasswordStrength = pwd => {
    if (!pwd) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, label: 'Moderate', color: 'bg-amber-500' };
    return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isOtpStep) {
      if (verificationCode.some(digit => !digit)) {
        setError('Please enter the 6-digit verification code.');
        return;
      }

      const otp = verificationCode.join('');
      const response = await userVerify(otp, email.trim().toLowerCase());
      if (response?.success) {
        navigate('/dashboard', { replace: true });
      }
      return;
    }

    if (!email.trim()) {
      setError('Enter your email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service to create an account.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const response = await registerUser(normalizedEmail, password, confirmPassword);
    if (response?.success) {
      setEmail(response.data?.email || normalizedEmail);
      setIsOtpStep(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
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

      {/* Main Card */}
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isOtpStep ? 'Verify your email' : 'Create your Linkly account'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              {isOtpStep
                ? `Enter the 6-digit verification code to continue.`
                : 'Start shortening and analyzing your links in seconds. Free forever.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 text-xs">
                {error}
              </div>
            )}

            {isOtpStep ? (
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Verification Code
                </label>
                <div
                  className="grid grid-cols-6 gap-2"
                  role="group"
                  aria-label="Six-digit verification code"
                >
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      ref={element => { verificationInputs.current[index] = element; }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      aria-label={`Digit ${index + 1} of 6`}
                      onChange={e => {
                        const nextDigit = e.target.value.replace(/\D/g, '').slice(-1);
                        setVerificationCode(current =>
                          current.map((value, currentIndex) =>
                            currentIndex === index ? nextDigit : value
                          )
                        );
                        if (nextDigit && index < 5) {
                          verificationInputs.current[index + 1]?.focus();
                        }
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Backspace' && !digit && index > 0) {
                          verificationInputs.current[index - 1]?.focus();
                        }
                      }}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-center text-lg font-semibold text-slate-900 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                  Enter the 6-digit code to verify your email.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsOtpStep(false);
                    setError('');
                  }}
                  className="mt-3 text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
                >
                  Back to account details
                </button>
              </div>
            ) : (
              <>
                {/* <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Sarah Connor"
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div> */}

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                     Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Password Strength:</span>
                        <span className="font-semibold">{strength.label}</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                          style={{ width: `${(strength.score / 3) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={e => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded text-brand-600 focus:ring-brand-500"
                    />
                    <span className="text-slate-600 dark:text-slate-400 leading-tight">
                      I agree to Linkly's{' '}
                      <span className="text-brand-600 underline">Terms of Service</span> and{' '}
                      <span className="text-brand-600 underline">Privacy Policy</span>.
                    </span>
                  </label>
                </div>
              </>
            )}

            <Button
              type="submit"
              variant="electric"
              size="lg"
              className="w-full mt-2"
              loading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              {isOtpStep ? 'Verify Code' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="p-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Linkly, Inc. All rights reserved.
      </div>
    </div>
  );
}
