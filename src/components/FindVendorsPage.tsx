import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

interface FindVendorsPageProps {
  onBack: () => void;
  onSelectCategory: (category: string) => void;
}

export const FindVendorsPage: React.FC<FindVendorsPageProps> = ({
  onBack,
  onSelectCategory,
}) => {
  const categories = [
    {
      id: 'Photography',
      name: 'Photography',
      vendorsCount: '124 Vendors',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Makeup',
      name: 'Makeup',
      vendorsCount: '86 Vendors',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Decor',
      name: 'Decor',
      vendorsCount: '76 Vendors',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Mehendi',
      name: 'Mehendi',
      vendorsCount: '54 Vendors',
      image: '/src/assets/images/mehendi_category_1786688929519.jpg',
    },
    {
      id: 'Catering',
      name: 'Catering',
      vendorsCount: '91 Vendors',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Venue',
      name: 'Venue',
      vendorsCount: '128 Vendors',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Entertainment',
      name: 'Entertainment',
      vendorsCount: '58 Vendors',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Invitations',
      name: 'Invitation',
      vendorsCount: '68 Vendors',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 'Cars',
      name: 'Cars',
      vendorsCount: '45 Vendors',
      image: 'https://images.unsplash.com/photo-1513346940221-6f673d962e97?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const pastorCategory = {
    id: 'Pastor',
    name: 'Priests',
    vendorsCount: '12 Vendors',
    image: '/src/assets/images/pastor_category.jpg',
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.iconButton} onPress={onBack} activeOpacity={0.7}>
          <ChevronLeft className="w-6 h-6 text-[#2A2425]" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Vendors</Text>
        <View style={{ width: 40 }} /> {/* Placeholder for balance */}
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <div className="grid grid-cols-3 gap-x-3 gap-y-6 w-full">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => onSelectCategory(category.id)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.vendorsCount}>{category.vendorsCount}</Text>
            </motion.div>
          ))}
        </div>

        {/* Wide Pastor/Father Category */}
        <View style={styles.wideCategoryWrapper}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center cursor-pointer w-full"
            onClick={() => onSelectCategory(pastorCategory.id)}
          >
            <View style={styles.wideImageContainer}>
              <Image
                source={{ uri: pastorCategory.image }}
                style={styles.wideCategoryImage}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.categoryName}>{pastorCategory.name}</Text>
            <Text style={styles.vendorsCount}>{pastorCategory.vendorsCount}</Text>
          </motion.div>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#F7F4F0', // Matched background color from screenshot
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#F7F4F0',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2ddd5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 22,
    fontWeight: '700',
    color: '#2A2425',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    paddingTop: 10,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1, // To keep it perfectly square
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 8,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2B29',
    textAlign: 'center',
    lineHeight: 20,
  },
  vendorsCount: {
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    fontSize: 12,
    color: '#8D8985',
    textAlign: 'center',
  },
  wideCategoryWrapper: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 40, // Increased padding to decrease width
  },
  wideImageContainer: {
    width: '100%',
    height: 110, // Decreased height to make it smaller
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 8,
  },
  wideCategoryImage: {
    width: '100%',
    height: '100%',
  },
});
