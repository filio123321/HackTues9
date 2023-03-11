import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MovingGradientButton = ({ title, onPress }) => {
    const [colors, setColors] = useState(['#6a11cb', '#ce64d3', '#2575fc']);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prevColors) => {
        const newColors = [...prevColors];
        newColors.push(generateSimilarColor(newColors[0]));
        newColors.shift();
        return newColors;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const generateSimilarColor = (color) => {
    const variance = 50; // adjust this value to change the similarity
    const r = Math.max(Math.min(parseInt(color.slice(1, 3), 16) + Math.floor(Math.random() * variance * 2 - variance), 255), 0);
    const g = Math.max(Math.min(parseInt(color.slice(3, 5), 16) + Math.floor(Math.random() * variance * 2 - variance), 255), 0);
    const b = Math.max(Math.min(parseInt(color.slice(5, 7), 16) + Math.floor(Math.random() * variance * 2 - variance), 255), 0);
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  };

  const crossFadeColors = (oldColors, newColors, duration) => {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const fade = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentColors = [];
        for (let i = 0; i < oldColors.length; i++) {
          const oldColor = oldColors[i];
          const newColor = newColors[i];
          const r = Math.floor(oldColor.r * (1 - progress) + newColor.r * progress);
          const g = Math.floor(oldColor.g * (1 - progress) + newColor.g * progress);
          const b = Math.floor(oldColor.b * (1 - progress) + newColor.b * progress);
          currentColors.push(`rgb(${r},${g},${b})`);
        }
        setColors(currentColors);
        if (progress < 1) {
          requestAnimationFrame(fade);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(fade);
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        blurRadius={10}
        style={styles.button}>
        <Text style={styles.loginButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
  },
});

export default MovingGradientButton
