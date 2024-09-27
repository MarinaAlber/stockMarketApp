import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  BaseSpace,
  BorderRadius,
  DarkTheme,
  FontSizes,
  generateBoxShadowStyle,
} from '../../theme';

type CardProps = PropsWithChildren<{
  title: string;
  subTitle: string;
}>;

export const Card: FC<CardProps> = ({title, subTitle}) => {
  const placeholderText = title.substring(0, 2);
  return (
    <View style={styles.card}>
      <View style={styles.placeholder}>
        <Text allowFontScaling={false} style={styles.placeholder_text}>
          {placeholderText}
        </Text>
      </View>
      <Text allowFontScaling={false} numberOfLines={2} style={styles.text}>
        {title}
      </Text>
      <Text allowFontScaling={false} numberOfLines={2} style={styles.subTitle}>
        {subTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    backgroundColor: DarkTheme.primaryColor_300,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: BaseSpace.md,
    padding: 20,
    marginVertical: BaseSpace.md as number,
    marginHorizontal: BaseSpace.lg as number,
    borderColor: DarkTheme.primaryColor_300,
    borderWidth: 1,
    flex: 1 / 2,
    ...generateBoxShadowStyle(
      -1,
      1,
      DarkTheme.secondaryColor_dark,
      0.1,
      2,
      3,
      DarkTheme.secondaryColor_dark,
    ),
  },
  placeholder: {
    borderWidth: 1,
    borderColor: DarkTheme.primaryColor_200,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: BaseSpace.sm as number,
    paddingVertical: BaseSpace.xs as number,
    justifyContent: 'center',
    marginBottom: BaseSpace.xs as number,
  },

  placeholder_text: {
    fontSize: FontSizes.sm as number,
    color: DarkTheme.primaryColor_100,
  },
  text: {
    color: DarkTheme.secondaryColor,
    textAlign: 'center',
  },
  subTitle: {
    color: DarkTheme.primaryColor_100,
    fontSize: FontSizes.sm as number,
    textAlign: 'center',
  },
});
