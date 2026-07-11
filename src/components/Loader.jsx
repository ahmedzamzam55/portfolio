import { useApp } from '../hooks/useApp';

export default function Loader() {
  const { theme } = useApp();
  return (
    <div className="loader">
      <div className="loader-content">
        <img 
          src={theme === 'dark' ? '/logo_dark.png' : '/logo_light.png'} 
          alt="Loading..." 
          className="loader-logo-img" 
        />
        <div className="loader-bar"><div className="loader-progress"></div></div>
      </div>
    </div>
  );
}
