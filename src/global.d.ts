import 'react-native';
import React from 'react';

declare module 'react-native' {
  interface ViewProps {
    key?: React.Key | null;
  }
  interface TouchableWithoutFeedbackProps {
    key?: React.Key | null;
  }
  interface ScrollViewProps {
    key?: React.Key | null;
  }
}
