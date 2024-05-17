import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import i18next from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import 'intl-pluralrules';

i18next
  .use(initReactI18next)
  .init({
    lng: 'en', // Default language
    resources: {
      en: {
        translation: {
          position: 'Position',
          english: 'English',
          french: 'French',
        },
      },
      fr: {
        translation: {
          position: 'Position',
          english: 'Anglais',
          french: 'Français',
        },
      },
    },
    compatibilityJSON: 'v3', // Add this line
  });

const Localization = () => {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let subscription;
    const subscribeToAccelerometer = async () => {
      subscription = Accelerometer.addListener(accelerometerData => {
        setPosition(prevPosition => ({
          x: prevPosition.x + accelerometerData.x,
          y: prevPosition.y + accelerometerData.y
        }));
      });
    };

    subscribeToAccelerometer();

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  const handleChangeLanguage = (language) => {
    i18next.changeLanguage(language);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{t('position')}: {`(${position.x.toFixed(2)}, ${position.y.toFixed(2)})`}</Text>
      <Button title={t('english')} onPress={() => handleChangeLanguage('en')} />
      <Button title={t('french')} onPress={() => handleChangeLanguage('fr')} />
    </View>
  );
};

export default Localization;
