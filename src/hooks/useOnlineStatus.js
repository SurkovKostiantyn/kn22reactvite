import { useState, useEffect } from 'react';

const useOnlineStatus = () => {
  // Функція-хелпер для отримання типу з'єднання
  const getConnectionType = () => {
    return navigator.connection
      ? navigator.connection.effectiveType
      : 'unknown';
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  // Додаємо стан для типу швидкості
  const [connectionType, setConnectionType] = useState(getConnectionType());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Оновлення типу швидкості
    const handleConnectionChange = () => {
      setConnectionType(getConnectionType());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Підписка на зміну типу мережі (2g, 3g, 4g...)
    const conn = navigator.connection;
    if (conn) {
      conn.addEventListener('change', handleConnectionChange);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (conn) {
        conn.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  // Повертаємо об'єкт з обома значеннями
  return {
    isOnline,
    type: isOnline ? connectionType : 'none', // Якщо офлайн, тип логічно 'none'
  };
};

export default useOnlineStatus;
