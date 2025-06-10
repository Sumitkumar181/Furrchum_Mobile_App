import { Specialist } from '@/types';
import NutritionistIcon from '@/assets/images/Nutritionist.svg';
import BehavioristIcon from '@/assets/images/Behaviorist.svg';
import DentistIcon from '@/assets/images/Dentist.svg';
import NeurologistIcon from '@/assets/images/Neurologist.svg';
import OncologistIcon from '@/assets/images/Oncologist.svg';
import CardiologistIcon from '@/assets/images/Cardiologist.svg';
import EmergencyIcon from '@/assets/images/Emergency.svg';
import SurgeonIcon from '@/assets/images/surgeon.svg';

export const allspecialists: Specialist[] = [
  { id: '1', name: 'Nutritionist', icon: NutritionistIcon },
  { id: '2', name: 'Behaviorist', icon: BehavioristIcon },
  { id: '3', name: 'Dentist', icon: DentistIcon },
  { id: '4', name: 'Neurologist', icon: NeurologistIcon },
  { id: '5', name: 'Oncologist', icon: OncologistIcon },
  { id: '6', name: 'Cardiologist', icon: CardiologistIcon },
  { id: '7', name: 'Emergency', icon: EmergencyIcon },
  { id: '8', name: 'Surgeon', icon: SurgeonIcon },
];
