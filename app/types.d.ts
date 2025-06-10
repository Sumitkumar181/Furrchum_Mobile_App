import { type NavigatorScreenParams } from '@react-navigation/native';

type RootStackParamList = {
    '(tabs)': undefined;
    'vet/[id]': { id: string };
    'specialty/[name]': { name: string };
    'TopSurgeons': undefined; 
    
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}