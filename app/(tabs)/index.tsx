import { MaterialCommunityIcons } from '@expo/vector-icons';
import SpecialtyCard from '@/components/SpecialtyCard';
import VetCard from '@/components/VetCard';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { veterinarians } from '@/mocks/veterinarians';
import { useAuthStore } from '@/store/auth-store';
import { Specialty, Veterinarian } from '@/types';
import { useRouter } from 'expo-router';
import { Bell, MapPin } from 'lucide-react-native';
import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const topVets = Array.isArray(veterinarians) ? veterinarians.slice(0, 3) : [];

  const renderSpecialty = ({ item }: { item: Specialty }) => (
    <SpecialtyCard specialty={item} />
  );

  return (
    <View style={styles.container}>


      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={false} onRefresh={() => { }} />}
      >
        <Text style={styles.sectionTitle}>Doctor Specialty</Text>

        <View style={styles.specialIcon}>
          <TouchableOpacity onPress={() => router.push('/surgeon/TopSurgeons')}>
            <View style={styles.specialityContainer}>
              <View style={styles.specialtyIcon}>
                <FontAwesome5 name="user-md" size={38} color={Colors.primary} />
              </View>
              <Text style={styles.specialtyText}>Surgeon</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/emergency/OnEmergency')}>
          <View style={styles.specialityContainer}>
            <View style={styles.specialtyIcon}>
              <Icon name="medkit-outline" size={38} color={Colors.primary} />
            </View>
            <Text style={styles.specialtyText}>Emergency</Text>
            </View>
          </TouchableOpacity>
          

          <TouchableOpacity onPress={() => router.push('/behaviorist/TopBehaviorist')}>
          <View style={styles.specialityContainer}>
            <View style={styles.specialtyIcon}>
              <FontAwesome5 name="dog" size={38} color={Colors.primary} />
            </View>
            <Text style={styles.specialtyText}>Behaviorist</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/allspecialists/AllSpecialists')}>
          <View style={styles.specialityContainer}>
            <View style={styles.specialtyIcon}>
              <FontAwesome5 name="bars" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.specialtyText}>Other</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          data={topVets}
          renderItem={({ item }: { item: Veterinarian }) => (
            <View style={{ marginRight: 15 }}>
              <VetCard key={item.id} vet={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialtiesContainer}
        />

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton1}
            onPress={() => router.push('/appointment/new')}
          >
            <View style={styles.actionIconContainer}>
              <MaterialCommunityIcons name="video-outline" size={50} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.actionText}>Consult</Text>
              <Text style={styles.actionText}>with a vet</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton2}
            onPress={() => router.push('/emergency')}
          >
            <View style={styles.actionIconContainer}>
              <FontAwesome5 name="clinic-medical" size={38} color={Colors.primary} />
            </View>
            <View>
              <Text style={styles.actionText}>Find</Text>
              <Text style={styles.actionText}>Nearest Clinic</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.topVetsHeader}>
          <Text style={styles.sectionTitle}>Top Vet</Text>
          <TouchableOpacity onPress={() => router.push('/vets' as any)}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={topVets}
          renderItem={({ item }) => <VetCard key={item.id} vet={item} />}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    paddingTop: 200,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: Colors.white,
    marginLeft: 4,
    fontSize: 14,
  },
  userContainer: {
    marginTop: 16,
  },
  greeting: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  subGreeting: {
    color: Colors.white,
    fontSize: 14,
    opacity: 0.8,
  },
  notificationButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  specialIcon: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  specialityContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    marginBottom: 18,
    marginTop: 15,

  },
  specialtyIcon: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 65,
    width: 65,
    borderRadius: 34,
    backgroundColor: '#d9e4fc',
  },
  specialtyText: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 16,
    fontFamily: "inter",
    fontWeight: "400",
    paddingBottom: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  specialtiesContainer: {
    paddingRight: 20,
    
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  actionButton1: {
    flexDirection: "row",
    width: '48%',
    backgroundColor: Colors.lightBlue,
    borderRadius: 12,
    padding: 12,
    gap: 14,
    alignItems: 'center',
    justifyContent: "space-evenly",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton2: {
    flexDirection: "row",
    width: '48%',
    backgroundColor: Colors.lightBlue,
    borderRadius: 12,
    padding: 12,
    gap: 11,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 12,
  },
  actionIcon: {
    width: '100%',
    height: '100%',
  },
  actionText: {
    fontSize: 15,
    color: Colors.lightBlack,
    fontWeight: '400',
    textAlign: 'center',
  },
  topVetsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  bottomPadding: {
    height: 100,
  },
});






/* <View style={styles.header}>
        <View style={styles.locationContainer}>
          <MapPin size={20} color={Colors.white} />
          <Text style={styles.locationText}>my location</Text>
        </View>
        <View style={styles.userContainer}>
          <Text style={styles.greeting}>
            Hello, {user?.name?.split(' ')[0] || 'User'} 👋
          </Text>
          <Text style={styles.subGreeting}>How is your pet health?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={24} color={Colors.white} />
        </TouchableOpacity>
      </View> */