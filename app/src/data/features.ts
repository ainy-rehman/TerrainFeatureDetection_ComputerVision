export interface Feature {
  name: string;
  description: string;
  image: string;
}

export const features: Feature[] = [
  {
    name: 'Dark Dune',
    description: 'Large, dark-colored sand dunes formed by Martian winds',
    image: 'https://images.unsplash.com/photo-1610296669228-602fa827fc1f'
  },
  {
    name: 'Bright Dune',
    description: 'Light-colored sand accumulations shaped by atmospheric processes',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4'
  },
  {
    name: 'Spider',
    description: 'Radial channel networks carved by seasonal CO2 ice sublimation',
    image: 'https://images.unsplash.com/photo-1545156521-77bd85671d30'
  },
  {
    name: 'Slope Streak',
    description: 'Dark marks on slopes caused by dust avalanches',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679'
  },
  {
    name: 'Impact Ejecta',
    description: 'Material thrown out during meteorite impacts',
    image: 'https://img.freepik.com/premium-photo/depiction-meteorite-impact-with-crater-forming-ejecta-spreading-across-landscape_1314467-74649.jpg?w=740'
  },
  {
    name: 'Swiss Cheese',
    description: 'Pitted terrain in the polar regions resembling Swiss cheese',
    image: 'https://www.universetoday.com/wp-content/uploads/2017/06/ESP_049972_0930.jpg'
  },
  {
    name: 'Crater',
    description: 'Circular depressions formed by meteorite impacts',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679'
  }
];