export interface Office {
  id: string;
  name: string;
  subtitle: string;
  address: string[];
  phone?: string;
  color: string;
}

export const offices: Office[] = [
  {
    id: 'beijing',
    name: 'Beijing',
    subtitle: 'Headquarters',
    address: ['Room 1602, Unit 2', 'No. 6, Linshijia, Lincui Road', 'Beijing, 100101'],
    color: '#c4604a',
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    subtitle: 'East China',
    address: ['No. 285 Yeji Road', 'Shanghai, 200444'],
    color: '#3d8b8b',
  },
  {
    id: 'guangzhou',
    name: 'Guangzhou',
    subtitle: 'South China',
    address: ['Room 1501, South Block', 'Xindacheng Plaza', 'Guangzhou, 510000'],
    color: '#d4a574',
  },
  {
    id: 'chongqing',
    name: 'Chongqing',
    subtitle: 'West China',
    address: ["Group 4/5, Rong'gui Village", 'Chongqing, 408000'],
    color: '#8b6fa8',
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    subtitle: 'Southeast Asia',
    address: ['PT 16143', 'Jalan Telok Mengkuang', '42500 Telok Panglima Garang', 'Selangor, Malaysia'],
    color: '#4a7bbd',
  },
];

export const contactInfo = {
  mobile: '+86 137 0188 5592',
  whatsapp: '+86 137 0188 5592',
  email: 'info@zoteq.com',
  hours: 'Monday through Friday, 9am to 6pm local time',
};

export const partners = [
  'Bedoukian Inc',
  'Capua S.r.l.',
  'Emerald Kalama',
  'Evera by Citrosuco',
  'Firmenich S.A.',
  'Givaudan S.A.',
  'Nippon Zeon',
  'Synarome S.A.',
];
