import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Smartphone, Phone, Building, Check, ArrowLeft } from 'lucide-react';
import { signUpWithEmail } from '../firebase/auth';
import { getFirebaseErrorMessage } from '../utils/errorHandler';
import LoadingSpinner from './LoadingSpinner';

interface SignupPageProps {
  onSignup: () => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onBack, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'citizen' | 'municipality'>('citizen');
  const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    organization: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userData = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userType: userType,
        organization: userType === 'municipality' ? formData.organization : undefined,
        phone: signupMethod === 'phone' ? formData.phone : undefined
      };

      await signUpWithEmail(formData.email, formData.password, userData);
      alert('Signup successful! You can now use your account.');
      onSignup();
    } catch (error: unknown) {
      console.error('Signup error:', error);
      const errorCode = (error as { code?: string })?.code;
      const errorMessage = getFirebaseErrorMessage(errorCode || 'unknown-error');
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const isStep1Valid = () => {
    return formData.firstName && formData.lastName && 
           (signupMethod === 'email' ? formData.email : formData.phone);
  };

  const isStep2Valid = () => {
    return formData.password && formData.confirmPassword && 
           formData.password === formData.confirmPassword && 
           formData.password.length >= 8;
  };

  const isStep3Valid = () => {
    return formData.agreeToTerms;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-300 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>

        {/* Signup Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 animate-scale-in">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">SS</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Swachh Saathi</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {currentStep} of 3</span>
              <span className="text-sm text-gray-500">{Math.round((currentStep / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* User Type Toggle */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            <button
              onClick={() => setUserType('citizen')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                userType === 'citizen'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Smartphone size={16} />
              <span>Citizen</span>
            </button>
            <button
              onClick={() => setUserType('municipality')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                userType === 'municipality'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Building size={16} />
              <span>Municipality</span>
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  {/* Signup Method Toggle */}
                  <div className="flex bg-gray-100 rounded-2xl p-1">
                    <button
                      type="button"
                      onClick={() => setSignupMethod('email')}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                        signupMethod === 'email'
                          ? 'bg-white text-green-600 shadow-sm'
                          : 'text-gray-600 hover:text-green-600'
                      }`}
                    >
                      <Mail size={16} />
                      <span>Email</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupMethod('phone')}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                        signupMethod === 'phone'
                          ? 'bg-white text-green-600 shadow-sm'
                          : 'text-gray-600 hover:text-green-600'
                      }`}
                    >
                      <Phone size={16} />
                      <span>Phone</span>
                    </button>
                  </div>

                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                      {signupMethod === 'email' ? 'Email Address' : 'Phone Number'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        {signupMethod === 'email' ? <Mail size={20} className="text-gray-400" /> : <Phone size={20} className="text-gray-400" />}
                      </div>
                      <input
                        id="contact"
                        type={signupMethod === 'email' ? 'email' : 'tel'}
                        value={signupMethod === 'email' ? formData.email : formData.phone}
                        onChange={(e) => handleInputChange(signupMethod === 'email' ? 'email' : 'phone', e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder={signupMethod === 'email' ? 'Enter your email' : 'Enter your phone number'}
                        required
                      />
                    </div>
                  </div>

                  {userType === 'municipality' && (
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Name
                      </label>
                      <input
                        id="organization"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => handleInputChange('organization', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter organization name"
                        required
                      />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStep1Valid()}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  <span>Next Step</span>
                  <ArrowRight size={20} />
                </button>
              </>
            )}

            {/* Step 2: Password Setup */}
            {currentStep === 2 && (
              <>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="p-4 bg-gray-50 rounded-2xl">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li className={`flex items-center space-x-2 ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                        <Check size={12} className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'} />
                        <span>At least 8 characters</span>
                      </li>
                      <li className={`flex items-center space-x-2 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                        <Check size={12} className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'} />
                        <span>One uppercase letter</span>
                      </li>
                      <li className={`flex items-center space-x-2 ${/[a-z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                        <Check size={12} className={/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'} />
                        <span>One lowercase letter</span>
                      </li>
                      <li className={`flex items-center space-x-2 ${/\d/.test(formData.password) ? 'text-green-600' : ''}`}>
                        <Check size={12} className={/\d/.test(formData.password) ? 'text-green-600' : 'text-gray-400'} />
                        <span>One number</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-gray-300 flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStep2Valid()}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    <span>Next Step</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Terms and Final Step */}
            {currentStep === 3 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                        required
                      />
                      <span className="text-sm text-gray-700">
                        I agree to the{' '}
                        <button type="button" className="text-green-600 hover:text-green-700 font-medium">
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button type="button" className="text-green-600 hover:text-green-700 font-medium">
                          Privacy Policy
                        </button>
                      </span>
                    </label>

                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.agreeToMarketing}
                        onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                      />
                      <span className="text-sm text-gray-700">
                        I agree to receive marketing communications and updates about Swachh Saathi
                      </span>
                    </label>
                  </div>

                  {/* Benefits Preview */}
                  <div className="p-4 bg-green-50 rounded-2xl">
                    <h4 className="text-sm font-semibold text-green-800 mb-2">
                      {userType === 'citizen' ? 'Citizen Benefits:' : 'Municipality Benefits:'}
                    </h4>
                    <ul className="text-xs text-green-700 space-y-1">
                      {userType === 'citizen' ? (
                        <>
                          <li>• Real-time garbage truck tracking</li>
                          <li>• Smart pickup notifications</li>
                          <li>• AI-powered disposal tips</li>
                          <li>• Route optimization</li>
                          <li>• Community engagement</li>
                        </>
                      ) : (
                        <>
                          <li>• Route optimization dashboard</li>
                          <li>• Fleet management tools</li>
                          <li>• Citizen feedback analytics</li>
                          <li>• Performance monitoring</li>
                          <li>• Cost optimization</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 hover:bg-gray-300 flex items-center justify-center space-x-2"
                  >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                  </button>
                  <button
                    type="submit"
                    disabled={!isStep3Valid() || isLoading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="md" color="white" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={onSwitchToLogin}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Your data is protected with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage; 