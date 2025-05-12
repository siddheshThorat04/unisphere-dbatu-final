import React, { useEffect } from 'react';
import { CiHome } from 'react-icons/ci';
import { useDarkThemeContext } from '../context/DarkTheme';

const PrivacyPolicy = () => {
  const { isDark } = useDarkThemeContext();

  useEffect(() => {
    console.log(isDark);
  }, []);

  const isDarkMode = isDark === 'false';

  return (
    <div className={isDarkMode ? 'bg-black h-screen overflow-y-auto' : 'bg-white h-screen overflow-y-auto'}>
      <button className="text-black z-100">
        <CiHome
          onClick={() => (window.location.href = '/')}
          className={isDarkMode ? 'HomeButton text-white' : 'HomeButton text-black'}
        />
      </button>

      <h1 className={isDarkMode ? 'text-white text-xl text-center mt-4 fontedHeading' : 'text-black text-xl text-center mt-4 fontedHeading'}>
        Privacy Policy
      </h1>

      <section className="py-10 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className={isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-700 text-lg'}>
            At <strong>UniSphere</strong>, your privacy and trust are our top priorities. We are committed to protecting your personal information and providing a secure platform for all our users.
          </p>

          <p className={isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-700 text-lg'}>
            🔒 <strong>No Chat Logs Saved:</strong> All your chat messages are <u>end-to-end real-time</u> and <strong>are not stored on any server</strong>. Once the session ends, the data is gone. We respect your conversations and believe privacy is a right, not a feature.
          </p>

          <p className={isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-700 text-lg'}>
            🛠️ We only collect limited non-personal data like browser type and session duration to improve user experience — never your private conversations.
          </p>

          <p className={isDarkMode ? 'text-gray-300 text-lg' : 'text-gray-700 text-lg'}>
            🙌 Our platform is built by students, for students. We aim to create a safe, respectful, and transparent environment for everyone across 70+ colleges.
          </p>

          <p className={isDarkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
            By using UniSphere, you agree to this privacy-first approach. For any concerns, contact us at <a href="mailto:privacy@unisphere.in" className="underline">privacy@unisphere.in</a>.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
